import { useState, useEffect, useCallback } from "react";

const API_PRODUCTS  = "https://meal-management-backend-update-3.onrender.com/api/allmetrialproductadd";
const API_MATERIALS = "https://meal-management-backend-update-3.onrender.com/api/submaterial";

// Safe accessor
const getIngredients = (p) => p?.ingredients ?? [];

async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "API Error");
  return json;
}

// ── Non-weight units cannot be used in gram-based recipe ──
const NON_WEIGHT = ["piece", "dozen", "bag", "packet"];

export default function ProductManager() {
  const [view, setView]           = useState("list");   // "list" | "form" | "cost"
  const [products, setProducts]   = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selected, setSelected]   = useState(null);     // product being viewed/edited
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [p, m] = await Promise.all([
        apiFetch(API_PRODUCTS),
        apiFetch(API_MATERIALS),
      ]);
      setProducts(Array.isArray(p?.data) ? p.data : []);
      setMaterials(Array.isArray(m?.data) ? m.data.filter((mat) => !NON_WEIGHT.includes(mat.unit)) : []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const openNew  = () => { setSelected(null); setView("form"); };
  const openEdit = (p) => { setSelected(p);   setView("form"); };
  const openCost = (p) => { setSelected(p);   setView("cost"); };

  const deleteProduct = async (id) => {
    if (!confirm("এই প্রোডাক্ট মুছে ফেলবেন?")) return;
    try {
      await apiFetch(`${API_PRODUCTS}/${id}`, { method: "DELETE" });
      await loadAll();
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">প্রোডাক্ট ও রেসিপি</h1>
            <p className="text-sm text-gray-500 mt-0.5">Recipe-based Cost Calculator</p>
          </div>
          {view !== "list" && (
            <button onClick={() => { setView("list"); setSelected(null); }}
              className="text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100">
              ← তালিকায় ফিরুন
            </button>
          )}
          {view === "list" && (
            <button onClick={openNew}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-2">
              + নতুন প্রোডাক্ট
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 flex justify-between">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {loading && <div className="text-center py-12 text-gray-400 text-sm">লোড হচ্ছে...</div>}

        {!loading && view === "list" && (
          <ProductList
            products={products}
            onEdit={openEdit}
            onDelete={deleteProduct}
            onCost={openCost}
          />
        )}
        {!loading && view === "form" && (
          <ProductForm
            materials={materials}
            existing={selected}
            onSaved={async () => { await loadAll(); setView("list"); }}
            onError={setError}
          />
        )}
        {!loading && view === "cost" && selected && (
          <CostCalculator product={selected} />
        )}
      </div>
    </div>
  );
}

// ========== PRODUCT LIST ==========
function ProductList({ products, onEdit, onDelete, onCost }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
        <div className="text-4xl mb-3">🍽️</div>
        এখনো কোনো প্রোডাক্ট নেই। নতুন প্রোডাক্ট যোগ করুন।
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <div key={p._id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="font-medium text-gray-800">{p.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Serving: {p.servingSize}g · {(p.ingredients ?? []).length} টি উপকরণ
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(p.ingredients ?? []).map((ing, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {typeof ing.material === "object" ? ing.material.name : "–"} ({ing.gramPerServing}g)
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => onCost(p)}
              className="text-sm bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-1.5 hover:bg-green-100">
              💰 খরচ দেখুন
            </button>
            <button onClick={() => onEdit(p)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100">✏️</button>
            <button onClick={() => onDelete(p._id)}
              className="text-xs border border-red-200 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-50">🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ========== PRODUCT FORM ==========
function ProductForm({ materials, existing, onSaved, onError }) {
  const [name, setName]               = useState(existing?.name ?? "");
  const [servingSize, setServingSize] = useState(existing?.servingSize ?? "");
  const [ingredients, setIngredients] = useState(
    existing?.ingredients?.map((ing) => ({
      material: typeof ing.material === "object" ? ing.material._id : ing.material,
      gramPerServing: ing.gramPerServing,
    })) ?? []
  );
  const [selMat, setSelMat]   = useState("");
  const [selGram, setSelGram] = useState("");
  const [saving, setSaving]   = useState(false);

  const addIngredient = () => {
    if (!selMat || !selGram || +selGram <= 0) return alert("উপকরণ ও গ্রাম পরিমাণ দিন!");
    if (ingredients.find((i) => i.material === selMat))
      return alert("এই উপকরণ আগেই যোগ করা হয়েছে!");
    setIngredients((prev) => [...prev, { material: selMat, gramPerServing: +selGram }]);
    setSelMat(""); setSelGram("");
  };

  const removeIngredient = (matId) =>
    setIngredients((prev) => prev.filter((i) => i.material !== matId));

  const getMatName = (id) => materials.find((m) => m._id === id)?.name ?? id;

  const save = async () => {
    if (!name.trim() || !servingSize || ingredients.length === 0)
      return alert("নাম, serving size এবং অন্তত একটি উপকরণ দিন!");
    setSaving(true);
    const body = { name, servingSize: +servingSize, ingredients };
    try {
      if (existing) {
        await apiFetch(`${API_PRODUCTS}/${existing._id}`, {
          method: "PUT", body: JSON.stringify(body),
        });
      } else {
        await apiFetch(API_PRODUCTS, { method: "POST", body: JSON.stringify(body) });
      }
      onSaved();
    } catch (e) { onError(e.message); }
    finally { setSaving(false); }
  };

  // Live cost preview
  const liveTotal = ingredients.reduce((sum, ing) => {
    const mat = materials.find((m) => m._id === ing.material);
    if (!mat || mat.pricePerGram == null) return sum;
    return sum + ing.gramPerServing * mat.pricePerGram;
  }, 0);

  return (
    <div className="space-y-5">
      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-4">
          {existing ? "প্রোডাক্ট সম্পাদনা করুন" : "নতুন প্রোডাক্ট তৈরি করুন"}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>প্রোডাক্টের নাম</Label>
            <Input placeholder="যেমন: ডাল, ভর্তা, মাছের ঝোল..." value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>মোট Serving Size (গ্রাম/জন)</Label>
            <Input type="number" placeholder="যেমন: 30" value={servingSize}
              onChange={(e) => setServingSize(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-3">উপকরণ (Ingredients)</h2>

        {/* Add row */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <Label>কাঁচামাল বেছে নিন</Label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400"
              value={selMat} onChange={(e) => setSelMat(e.target.value)}>
              <option value="">-- বেছে নিন --</option>
              {materials.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.unit}) — ৳{m.pricePerGram?.toFixed(4) ?? "N/A"}/g
                </option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <Label>গ্রাম/জন</Label>
            <Input type="number" placeholder="g" value={selGram}
              onChange={(e) => setSelGram(e.target.value)} />
          </div>
          <div className="flex items-end">
            <button onClick={addIngredient}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg px-4 py-2">
              যোগ +
            </button>
          </div>
        </div>

        {/* Ingredient table */}
        {ingredients.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm border border-dashed border-gray-200 rounded-lg">
            উপরে উপকরণ যোগ করুন
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <Th>উপকরণ</Th>
                <Th>গ্রাম/জন</Th>
                <Th>প্রতি গ্রাম দাম</Th>
                <Th>খরচ/জন</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ing) => {
                const mat = materials.find((m) => m._id === ing.material);
                const ppg = mat?.pricePerGram ?? null;
                const cost = ppg != null ? ing.gramPerServing * ppg : null;
                return (
                  <tr key={ing.material} className="border-b border-gray-50">
                    <Td><span className="font-medium">{getMatName(ing.material)}</span></Td>
                    <Td>{ing.gramPerServing}g</Td>
                    <Td>
                      {ppg != null
                        ? <span className="text-purple-700">৳{ppg.toFixed(4)}</span>
                        : <span className="text-gray-400">N/A</span>}
                    </Td>
                    <Td>
                      {cost != null
                        ? <span className="text-blue-700 font-medium">৳{cost.toFixed(4)}</span>
                        : "–"}
                    </Td>
                    <Td>
                      <button onClick={() => removeIngredient(ing.material)}
                        className="text-xs text-red-400 hover:text-red-600 border border-red-200 rounded px-2 py-0.5 hover:bg-red-50">
                        ✕
                      </button>
                    </Td>
                  </tr>
                );
              })}
              <tr className="bg-gray-50 font-semibold">
                <Td colSpan={3}>মোট খরচ/জন (preview)</Td>
                <Td><span className="text-blue-700">৳{liveTotal.toFixed(4)}</span></Td>
                <Td></Td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <button onClick={save} disabled={saving}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl py-3">
        {saving ? "সংরক্ষণ হচ্ছে..." : existing ? "আপডেট করুন ✓" : "প্রোডাক্ট সংরক্ষণ করুন ✓"}
      </button>
    </div>
  );
}

// ========== COST CALCULATOR ==========
function CostCalculator({ product }) {
  const [persons, setPersons]   = useState(1);
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const calculate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiFetch(
        `${API_PRODUCTS}/${product._id}/cost?persons=${persons}`
      );
      setResult(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [product._id, persons]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-medium text-gray-700 mb-1">{product.name} — খরচ হিসাব</h2>
        <p className="text-xs text-gray-500 mb-4">Serving size: {product.servingSize}g/জন</p>
        <div className="flex items-end gap-3">
          <div>
            <Label>কতজনের জন্য?</Label>
            <Input type="number" min="1" value={persons}
              onChange={(e) => setPersons(Math.max(1, +e.target.value))}
              className="w-36" />
          </div>
          <button onClick={calculate}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg px-5 py-2">
            হিসাব করুন
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">⚠️ {error}</div>
      )}

      {loading && <div className="text-center py-8 text-gray-400 text-sm">হিসাব হচ্ছে...</div>}

      {!loading && result && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">প্রতি জনের খরচ</div>
              <div className="text-xl font-semibold text-blue-700">
                ৳{result.costPerServing.toFixed(2)}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">মোট লোক</div>
              <div className="text-xl font-semibold text-gray-800">{result.persons} জন</div>
            </div>
            <div className="bg-green-50 rounded-xl border border-green-200 p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">সর্বমোট খরচ</div>
              <div className="text-xl font-semibold text-green-700">
                ৳{result.totalCost.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-3">উপকরণ ভিত্তিক বিস্তারিত</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <Th>উপকরণ</Th>
                  <Th>গ্রাম/জন</Th>
                  <Th>প্রতি গ্রাম দাম</Th>
                  <Th>খরচ/জন</Th>
                  <Th>{result.persons} জনের মোট</Th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <Td><span className="font-medium">{row.name}</span></Td>
                    <Td>{row.gramPerServing}g</Td>
                    <Td>
                      {row.pricePerGram != null
                        ? <span className="text-purple-700">৳{row.pricePerGram.toFixed(4)}</span>
                        : <span className="text-gray-400 text-xs">{row.note}</span>}
                    </Td>
                    <Td>
                      {row.costForServing != null
                        ? <span className="text-blue-600">৳{row.costForServing.toFixed(4)}</span>
                        : "–"}
                    </Td>
                    <Td>
                      {row.costForServing != null
                        ? <span className="font-semibold text-gray-800">
                            ৳{(row.costForServing * result.persons).toFixed(2)}
                          </span>
                        : "–"}
                    </Td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <Td colSpan={3}>সর্বমোট</Td>
                  <Td><span className="text-blue-700">৳{result.costPerServing.toFixed(4)}</span></Td>
                  <Td><span className="text-green-700">৳{result.totalCost.toFixed(2)}</span></Td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ── Small UI Components ───────────────────────────────────
function Label({ children }) {
  return <label className="block text-xs text-gray-500 mb-1">{children}</label>;
}
function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400 ${className}`}
      {...props}
    />
  );
}
function Th({ children, ...props }) {
  return <th className="px-3 py-2 text-xs font-medium text-gray-500 text-left" {...props}>{children}</th>;
}
function Td({ children, colSpan }) {
  return <td className="px-3 py-2.5 text-gray-700" colSpan={colSpan}>{children}</td>;
}
