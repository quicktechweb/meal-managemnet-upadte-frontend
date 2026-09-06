import { useState, useEffect, useCallback } from "react";
// import { useAllwiseInstituteUserOrderLists } from "../../api/cms/user.hook";
import { useAllwiseInstituteUserOrderLists } from "../../../../../api/cms/user.hook";

const API = "https://alabadanbackendpart.alabadan.com/api/submaterial";
const API_PRODUCTS = "https://alabadanbackendpart.alabadan.com/api/allmetrialproductadd";

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "API Error");
  return json;
}

const NON_WEIGHT = ["piece", "dozen", "bag", "packet"];

// Get today's day name (e.g. "Wednesday")
const getTodayName = () =>
  new Date().toLocaleDateString("en-US", { weekday: "long" });

// Parse product titles from meal selected_items
// "Vat,Goru" → ["vat", "goru"]
const parseTitles = (titleStr = "") =>
  titleStr
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

export default function RawMaterialManager() {
  const [tab, setTab] = useState("materials");
  const [materials, setMaterials] = useState([]);
  const [costings, setCostings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [matForm, setMatForm] = useState({ name: "", qty: "", unit: "kg", pricePerUnit: "" });
  const [editId, setEditId] = useState(null);
  const [costForm, setCostForm] = useState({ name: "", totalCost: "", selectedMats: [] });

  // Orders from existing hook — same source as MealOrderPage, no extra API call
  const { data: ordersRaw, isLoading: ordersLoading } = useAllwiseInstituteUserOrderLists();
  const ordersData = ordersRaw ?? [];

  // Deduction state
  const [deductLoading, setDeductLoading] = useState(false);
  const [deductPreview, setDeductPreview] = useState(null); // null | { items: [], todayDay: string }
  const [deductResult, setDeductResult] = useState(null);

  const loadMaterials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiFetch(API + "/");
      setMaterials(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCostings = useCallback(async () => {
    try {
      const { data } = await apiFetch(API + "/costings");
      setCostings(data);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const loadSummary = useCallback(async () => {
    try {
      const res = await apiFetch(API + "/costings/summary");
      setSummary(res);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    loadMaterials();
    loadCostings();
  }, [loadMaterials, loadCostings]);

  useEffect(() => {
    if (tab === "summary") loadSummary();
  }, [tab, loadSummary]);

  // ── DEDUCTION LOGIC ─────────────────────────────────────────────────────────
  // Step 1: orders come from the hook above; only products need a fresh fetch
  const buildDeductionPreview = useCallback(async () => {
    setDeductLoading(true);
    setDeductResult(null);
    try {
      const todayDay = getTodayName(); // e.g. "Wednesday"

      // orders already loaded via hook — just fetch products
      const productsRes = await apiFetch(API_PRODUCTS);

      const orders = ordersData; // from useAllwiseInstituteUserOrderLists
      const products = Array.isArray(productsRes?.data) ? productsRes.data : [];

      // Build a product lookup by lowercase name
      // product.name = "goru" matches title "Goru"
      const productByName = {};
      products.forEach((p) => {
        productByName[p.name.toLowerCase().trim()] = p;
      });

      // Accumulate: materialId → { name, unit, totalGramsToDeduct }
      const deductMap = {}; // key: material _id

      orders.forEach((userOrder) => {
        const todayMeals = (userOrder.meals || []).filter(
          (m) => m.day === todayDay && m.is_on
        );

        todayMeals.forEach((meal) => {
          (meal.selected_items || []).forEach((item) => {
            const titles = parseTitles(item.title);
            titles.forEach((title) => {
              const product = productByName[title];
              if (!product) return;

              (product.ingredients || []).forEach((ing) => {
                const mat =
                  typeof ing.material === "object" ? ing.material : null;
                if (!mat) return;

                const key = mat._id;
                if (!deductMap[key]) {
                  deductMap[key] = {
                    materialId: key,
                    name: mat.name,
                    unit: mat.unit,
                    totalGramsToDeduct: 0,
                    gramPerServing: ing.gramPerServing,
                    productName: product.name,
                    ordersCount: 0,
                  };
                }
                deductMap[key].totalGramsToDeduct += ing.gramPerServing;
                deductMap[key].ordersCount += 1;
              });
            });
          });
        });
      });

      const items = Object.values(deductMap);
      setDeductPreview({ items, todayDay });
    } catch (e) {
      setError("Order/Product লোড করতে সমস্যা: " + e.message);
    } finally {
      setDeductLoading(false);
    }
  }, [ordersData]);

  // Step 2: Apply the deductions via API (PUT each material's new qty)
  const applyDeductions = async () => {
    if (!deductPreview?.items?.length) return;
    if (!window.confirm("আজকের অর্ডার অনুযায়ী কাঁচামাল stock থেকে বাদ দেওয়া হবে। নিশ্চিত?")) return;

    setDeductLoading(true);
    const results = [];

    for (const item of deductPreview.items) {
      const mat = materials.find((m) => m._id === item.materialId);
      if (!mat) {
        results.push({ name: item.name, status: "not_found" });
        continue;
      }

      // Convert grams to material's unit for subtraction
      // material stored in kg → deduct grams → convert to kg
      let deductInUnit = item.totalGramsToDeduct;
      if (mat.unit === "kg") deductInUnit = item.totalGramsToDeduct / 1000;
      else if (mat.unit === "liter") deductInUnit = item.totalGramsToDeduct / 1000;
      // g, ml → already in same unit
      else if (mat.unit === "g" || mat.unit === "ml") deductInUnit = item.totalGramsToDeduct;

      const newQty = Math.max(0, mat.qty - deductInUnit);

      try {
        await apiFetch(API + `/${mat._id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: mat.name,
            qty: newQty,
            unit: mat.unit,
            pricePerUnit: mat.pricePerUnit,
          }),
        });
        results.push({
          name: mat.name,
          unit: mat.unit,
          before: mat.qty,
          deducted: deductInUnit,
          after: newQty,
          status: "ok",
        });
      } catch (e) {
        results.push({ name: mat.name, status: "error", msg: e.message });
      }
    }

    setDeductResult(results);
    setDeductPreview(null);
    await loadMaterials();
    setDeductLoading(false);
  };

  // ── EXISTING CRUD ────────────────────────────────────────────────────────────
  const addOrUpdateMaterial = async () => {
    const { name, qty, unit, pricePerUnit } = matForm;
    if (!name.trim() || !qty || !pricePerUnit) return alert("সব তথ্য পূরণ করুন!");
    const body = { name, qty: +qty, unit, pricePerUnit: +pricePerUnit };
    try {
      if (editId) {
        await apiFetch(API + `/${editId}`, { method: "PUT", body: JSON.stringify(body) });
        setEditId(null);
      } else {
        await apiFetch(API + "/", { method: "POST", body: JSON.stringify(body) });
      }
      setMatForm({ name: "", qty: "", unit: "kg", pricePerUnit: "" });
      await loadMaterials();
    } catch (e) { alert(e.message); }
  };

  const deleteMaterial = async (id) => {
    if (!confirm("এই কাঁচামাল মুছে ফেলবেন?")) return;
    try {
      await apiFetch(API + `/${id}`, { method: "DELETE" });
      await loadMaterials();
      await loadCostings();
    } catch (e) { alert(e.message); }
  };

  const startEdit = (m) => {
    setMatForm({ name: m.name, qty: String(m.qty), unit: m.unit, pricePerUnit: String(m.pricePerUnit) });
    setEditId(m._id);
    setTab("materials");
  };

  const addCosting = async () => {
    const { name, totalCost, selectedMats } = costForm;
    if (!name.trim() || !totalCost || selectedMats.length === 0)
      return alert("সব তথ্য পূরণ করুন এবং অন্তত একটি পণ্য বেছে নিন!");
    const body = { name, totalCost: +totalCost, materials: selectedMats };
    try {
      await apiFetch(API + "/costings", { method: "POST", body: JSON.stringify(body) });
      setCostForm({ name: "", totalCost: "", selectedMats: [] });
      await loadCostings();
      await loadMaterials();
    } catch (e) { alert(e.message); }
  };

  const toggleMatInCost = (matId) => {
    setCostForm((prev) => ({
      ...prev,
      selectedMats: prev.selectedMats.includes(matId)
        ? prev.selectedMats.filter((id) => id !== matId)
        : [...prev.selectedMats, matId],
    }));
  };

  const deleteCosting = async (id) => {
    if (!confirm("এই কস্টিং মুছে ফেলবেন?")) return;
    try {
      await apiFetch(API + `/costings/${id}`, { method: "DELETE" });
      await loadCostings();
      await loadMaterials();
    } catch (e) { alert(e.message); }
  };

  const totalBase = materials.reduce((s, m) => s + (m.totalBasePrice ?? 0), 0);
  const totalExtra = materials.reduce((s, m) => s + (m.extraCost ?? 0), 0);
  const grandTotal = totalBase + totalExtra;
  const totalCostingsAmount = costings.reduce((s, c) => s + c.totalCost, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">কাঁচামাল ও খরচ ব্যবস্থাপনা</h1>
            <p className="text-sm text-gray-500 mt-1">Raw Material & Costing Manager</p>
          </div>

          {/* Today's Order Deduction Button */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={buildDeductionPreview}
              disabled={deductLoading}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors shadow-sm"
            >
              {deductLoading ? (
                <span>⏳ লোড হচ্ছে...</span>
              ) : (
                <>
                  <span>📦</span>
                  <span>আজকের অর্ডার অনুযায়ী Stock বাদ দিন</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">{getTodayName()}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="ml-2 text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* ── Deduction Preview Modal ── */}
        {deductPreview && (
          <DeductionPreview
            preview={deductPreview}
            materials={materials}
            onConfirm={applyDeductions}
            onCancel={() => setDeductPreview(null)}
            loading={deductLoading}
          />
        )}

        {/* ── Deduction Result ── */}
        {deductResult && (
          <DeductionResult
            results={deductResult}
            onClose={() => setDeductResult(null)}
          />
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="মোট কাঁচামাল মূল্য" value={`৳${totalBase.toFixed(2)}`} color="text-gray-800" />
          <StatCard label="মোট পরিবহন/কস্টিং" value={`৳${totalCostingsAmount.toFixed(2)}`} color="text-amber-700" />
          <StatCard label="সর্বমোট খরচ" value={`৳${grandTotal.toFixed(2)}`} color="text-blue-700" />
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          {[
            { key: "materials", label: "কাঁচামাল এন্ট্রি" },
            { key: "costing", label: "কস্টিং যোগ করুন" },
            { key: "summary", label: "সারসংক্ষেপ" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading && <div className="text-center py-8 text-gray-400 text-sm">লোড হচ্ছে...</div>}

        {!loading && tab === "materials" && (
          <MaterialsTab materials={materials} matForm={matForm} setMatForm={setMatForm}
            editId={editId} addOrUpdate={addOrUpdateMaterial} onEdit={startEdit} onDelete={deleteMaterial} />
        )}
        {!loading && tab === "costing" && (
          <CostingTab materials={materials} costings={costings} costForm={costForm}
            setCostForm={setCostForm} toggleMat={toggleMatInCost} addCosting={addCosting} deleteCosting={deleteCosting} />
        )}
        {!loading && tab === "summary" && <SummaryTab summary={summary} />}
      </div>
    </div>
  );
}

// ========== DEDUCTION PREVIEW ==========
function DeductionPreview({ preview, materials, onConfirm, onCancel, loading }) {
  const { items, todayDay } = preview;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              📦 আজকের Stock বাদ করার Preview
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {todayDay}-এর সব active অর্ডার অনুযায়ী
            </p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            <div className="text-3xl mb-2">🎉</div>
            আজকের ({todayDay}) কোনো active অর্ডার নেই অথবা কোনো product match হয়নি।
          </div>
        ) : (
          <>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800 mb-4">
              ⚠️ নিচের পরিমাণ কাঁচামাল stock থেকে বাদ যাবে। একবার করলে undo হবে না।
            </div>
            <table className="w-full text-sm mb-5">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-2 px-2">কাঁচামাল</th>
                  <th className="pb-2 px-2">বর্তমান Stock</th>
                  <th className="pb-2 px-2">বাদ যাবে (g)</th>
                  <th className="pb-2 px-2">বাকি থাকবে</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const mat = materials.find((m) => m._id === item.materialId);
                  const currentQty = mat?.qty ?? "?";
                  const currentUnit = mat?.unit ?? item.unit;

                  // Convert deduction to display in material's unit
                  let deductDisplay = item.totalGramsToDeduct + "g";
                  let remaining = "?";
                  if (mat) {
                    let deductInUnit = item.totalGramsToDeduct;
                    if (mat.unit === "kg") deductInUnit = item.totalGramsToDeduct / 1000;
                    else if (mat.unit === "liter") deductInUnit = item.totalGramsToDeduct / 1000;
                    deductDisplay = `${item.totalGramsToDeduct}g (${deductInUnit.toFixed(3)} ${mat.unit})`;
                    remaining = `${Math.max(0, mat.qty - deductInUnit).toFixed(3)} ${mat.unit}`;
                  }

                  return (
                    <tr key={item.materialId} className="border-b border-gray-50">
                      <td className="py-2 px-2 font-medium text-gray-800">{item.name}</td>
                      <td className="py-2 px-2 text-gray-600">{currentQty} {currentUnit}</td>
                      <td className="py-2 px-2 text-red-600 font-medium">−{deductDisplay}</td>
                      <td className="py-2 px-2 text-green-700 font-semibold">{remaining}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex gap-3">
              <button onClick={onCancel}
                className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                বাতিল করুন
              </button>
              <button onClick={onConfirm} disabled={loading}
                className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white rounded-xl py-2.5 text-sm font-bold transition-colors">
                {loading ? "প্রসেস হচ্ছে..." : "✓ নিশ্চিত করুন ও বাদ দিন"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ========== DEDUCTION RESULT ==========
function DeductionResult({ results, onClose }) {
  const ok = results.filter((r) => r.status === "ok");
  const errors = results.filter((r) => r.status !== "ok");

  return (
    <div className="mb-5 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">📋 Stock বাদের ফলাফল</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm">✕ বন্ধ করুন</button>
      </div>
      {ok.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {ok.map((r, i) => (
            <div key={i} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm">
              <span className="text-green-500">✓</span>
              <span className="font-medium text-gray-800">{r.name}</span>
              <span className="text-gray-500">
                {r.before?.toFixed(3)} {r.unit} → <span className="text-red-500">−{r.deducted?.toFixed(3)}</span> → <span className="text-green-700 font-semibold">{r.after?.toFixed(3)} {r.unit}</span>
              </span>
            </div>
          ))}
        </div>
      )}
      {errors.length > 0 && (
        <div className="space-y-1.5">
          {errors.map((r, i) => (
            <div key={i} className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700">
              <span>✕</span>
              <span className="font-medium">{r.name}</span>
              <span>{r.status === "not_found" ? "Material not found in list" : r.msg}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── প্রতি গ্রাম দাম badge ──────────────────────────────────
function PricePerGramBadge({ pricePerGram, unit }) {
  if (NON_WEIGHT.includes(unit)) return <span className="text-gray-300 text-xs">N/A</span>;
  if (pricePerGram == null) return <span className="text-gray-300 text-xs">–</span>;
  const isLiquid = unit === "liter" || unit === "ml";
  const label = isLiquid ? "প্রতি ml" : "প্রতি g";
  return (
    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
      ৳{pricePerGram} <span className="font-normal opacity-70">{label}</span>
    </span>
  );
}

// ========== MATERIALS TAB ==========
function MaterialsTab({ materials, matForm, setMatForm, editId, addOrUpdate, onEdit, onDelete }) {
  const units = ["kg", "g", "liter", "ml", "piece", "dozen", "bag", "packet"];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-4">নতুন কাঁচামাল যোগ করুন</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="col-span-1">
            <Label>নাম (Material Name)</Label>
            <Input placeholder="যেমন: ডাল, পিঁয়াজ..." value={matForm.name}
              onChange={(e) => setMatForm({ ...matForm, name: e.target.value })} />
          </div>
          <div>
            <Label>পরিমাণ (Qty)</Label>
            <Input type="number" placeholder="0" value={matForm.qty}
              onChange={(e) => setMatForm({ ...matForm, qty: e.target.value })} />
          </div>
          <div>
            <Label>একক (Unit)</Label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400"
              value={matForm.unit} onChange={(e) => setMatForm({ ...matForm, unit: e.target.value })}>
              {units.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Label>দাম প্রতি একক (Price per unit ৳)</Label>
            <Input type="number" placeholder="0.00" value={matForm.pricePerUnit}
              onChange={(e) => setMatForm({ ...matForm, pricePerUnit: e.target.value })} />
          </div>
          <div className="flex items-end">
            <button onClick={addOrUpdate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors">
              {editId ? "আপডেট করুন ✓" : "যোগ করুন +"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-4">কাঁচামালের তালিকা</h2>
        {materials.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">এখনো কোনো কাঁচামাল যোগ করা হয়নি</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <Th>নাম</Th><Th>পরিমাণ</Th><Th>একক দাম</Th><Th>মূল মূল্য</Th>
                  <Th>অতিরিক্ত</Th><Th>চূড়ান্ত মূল্য</Th>
                  <Th><span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-xs">প্রতি গ্রাম/ml</span></Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => {
                  const base = m.totalBasePrice ?? 0;
                  const extra = m.extraCost ?? 0;
                  return (
                    <tr key={m._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <Td><span className="font-medium">{m.name}</span></Td>
                      <Td>{m.qty} {m.unit}</Td>
                      <Td>৳{(m.pricePerUnit ?? 0).toFixed(2)}</Td>
                      <Td>৳{base.toFixed(2)}</Td>
                      <Td>
                        {extra > 0
                          ? <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">+৳{extra.toFixed(2)}</span>
                          : <span className="text-gray-300">–</span>}
                      </Td>
                      <Td><span className="font-semibold text-blue-700">৳{(m.finalPrice ?? base).toFixed(2)}</span></Td>
                      <Td><PricePerGramBadge pricePerGram={m.pricePerGram} unit={m.unit} /></Td>
                      <Td>
                        <div className="flex gap-1">
                          <button onClick={() => onEdit(m)} className="text-xs border border-gray-200 rounded px-2 py-1 hover:bg-gray-100">✏️</button>
                          <button onClick={() => onDelete(m._id)} className="text-xs border border-red-200 text-red-600 rounded px-2 py-1 hover:bg-red-50">🗑</button>
                        </div>
                      </Td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50 font-medium">
                  <Td colSpan={3}>সর্বমোট</Td>
                  <Td>৳{materials.reduce((s, m) => s + (m.totalBasePrice ?? 0), 0).toFixed(2)}</Td>
                  <Td><span className="text-amber-700">+৳{materials.reduce((s, m) => s + (m.extraCost ?? 0), 0).toFixed(2)}</span></Td>
                  <Td><span className="text-blue-700">৳{materials.reduce((s, m) => s + (m.finalPrice ?? m.totalBasePrice ?? 0), 0).toFixed(2)}</span></Td>
                  <Td></Td><Td></Td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ========== COSTING TAB ==========
function CostingTab({ materials, costings, costForm, setCostForm, toggleMat, addCosting, deleteCosting }) {
  const perItem = costForm.selectedMats.length > 0 && costForm.totalCost
    ? (+costForm.totalCost / costForm.selectedMats.length).toFixed(2) : null;

  if (materials.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        ℹ️ প্রথমে "কাঁচামাল এন্ট্রি" ট্যাব থেকে কিছু কাঁচামাল যোগ করুন।
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-3">নতুন কস্টিং এন্ট্রি</h2>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700 mb-4">
          💡 <strong>কীভাবে কাজ করে:</strong> রিকশা ভাড়া বা যেকোনো পরিবহন খরচ লিখুন, তারপর কোন পণ্যগুলো এনেছেন সেটা বেছে নিন। খরচ সমানভাবে ভাগ হয়ে যাবে।
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <Label>কস্টিং এর নাম</Label>
            <Input placeholder="যেমন: রিকশা ভাড়া..." value={costForm.name}
              onChange={(e) => setCostForm({ ...costForm, name: e.target.value })} />
          </div>
          <div>
            <Label>মোট খরচ (৳)</Label>
            <Input type="number" placeholder="0.00" value={costForm.totalCost}
              onChange={(e) => setCostForm({ ...costForm, totalCost: e.target.value })} />
          </div>
        </div>
        <Label>কোন পণ্যের সাথে এই খরচ?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 mb-4">
          {materials.map((m) => {
            const checked = costForm.selectedMats.includes(m._id);
            return (
              <label key={m._id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-all ${
                checked ? "border-blue-400 bg-blue-50 text-blue-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                <input type="checkbox" checked={checked} onChange={() => toggleMat(m._id)} className="w-3.5 h-3.5" />
                <span className="flex-1">{m.name}</span>
                <span className="text-xs text-gray-400">{m.qty}{m.unit}</span>
              </label>
            );
          })}
        </div>
        {perItem && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800 mb-4">
            ✅ ৳{(+costForm.totalCost).toFixed(2)} ÷ {costForm.selectedMats.length} পণ্য = প্রতি পণ্যে <strong>৳{perItem}</strong>
          </div>
        )}
        <button onClick={addCosting}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-5 py-2 transition-colors">
          কস্টিং সংরক্ষণ করুন +
        </button>
      </div>

      {costings.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-medium text-gray-700 mb-4">কস্টিং তালিকা</h2>
          <div className="space-y-3">
            {costings.map((c) => {
              const matNames = (c.materials || []).map((m) => typeof m === "object" ? m.name : "(deleted)");
              const per = c.costPerMaterial ?? (c.materials?.length ? c.totalCost / c.materials.length : 0);
              return (
                <div key={c._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{c.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      মোট: ৳{c.totalCost.toFixed(2)} | {(c.materials || []).length} পণ্য →
                      <strong className="text-blue-700"> প্রতিটিতে ৳{per.toFixed(2)}</strong>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {matNames.map((name, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{name}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => deleteCosting(c._id)}
                    className="text-red-400 hover:text-red-600 text-xs border border-red-200 rounded px-2 py-1 hover:bg-red-50">🗑</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ========== SUMMARY TAB ==========
function SummaryTab({ summary }) {
  if (!summary) return <div className="text-center py-16 text-gray-400 text-sm">লোড হচ্ছে...</div>;
  if (!summary.data || summary.data.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        <div className="text-4xl mb-3">📊</div>
        এখনো কোনো ডেটা নেই।
      </div>
    );
  }
  const { data, totals } = summary;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-medium text-gray-700 mb-4">বিস্তারিত হিসাব</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
              <Th>কাঁচামাল</Th><Th>পরিমাণ</Th><Th>মূল মূল্য</Th><Th>অতিরিক্ত</Th>
              <Th>চূড়ান্ত মূল্য</Th>
              <Th><span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-xs">প্রতি গ্রাম/ml</span></Th>
            </tr>
          </thead>
          <tbody>
            {data.map((m) => (
              <tr key={m._id} className="border-b border-gray-50 hover:bg-gray-50">
                <Td><span className="font-medium">{m.name}</span></Td>
                <Td>{m.qty} {m.unit}</Td>
                <Td>৳{m.basePrice.toFixed(2)}</Td>
                <Td>
                  {m.extraCost > 0
                    ? <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">+৳{m.extraCost.toFixed(2)}</span>
                    : "–"}
                </Td>
                <Td><span className="font-semibold text-blue-700">৳{m.finalPrice.toFixed(2)}</span></Td>
                <Td><PricePerGramBadge pricePerGram={m.pricePerGram} unit={m.unit} /></Td>
              </tr>
            ))}
            {totals && (
              <tr className="bg-gray-50 font-semibold text-gray-700">
                <Td colSpan={2}>সর্বমোট</Td>
                <Td>৳{totals.totalBase.toFixed(2)}</Td>
                <Td><span className="text-amber-700">+৳{totals.totalExtra.toFixed(2)}</span></Td>
                <Td><span className="text-blue-700">৳{totals.grandTotal.toFixed(2)}</span></Td>
                <Td></Td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
function Label({ children }) {
  return <label className="block text-xs text-gray-500 mb-1">{children}</label>;
}
function Input({ ...props }) {
  return <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400" {...props} />;
}
function Th({ children, ...props }) {
  return <th className="px-3 py-2 text-xs font-medium text-gray-500" {...props}>{children}</th>;
}
function Td({ children, colSpan }) {
  return <td className="px-3 py-2.5 text-gray-700" colSpan={colSpan}>{children}</td>;
}
