import { useState, useEffect, useMemo } from "react";
import { useAllwiseInstituteUserOrderLists } from "../../../../../api/cms/user.hook";

const API_PRODUCTS  = "https://meal-management-backend-update-3.onrender.com/api/allmetrialproductadd";
const API_MATERIALS = "https://meal-management-backend-update-3.onrender.com/api/submaterial";

async function apiFetch(url) {
  const res  = await fetch(url, { headers: { "Content-Type": "application/json" } });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "API Error");
  return json.data;
}

function matchProductByTitle(title, products) {
  const titleParts = title
    .toLowerCase()
    .split(",")
    .map((s) => s.trim());
  return products.filter((p) =>
    titleParts.some(
      (part) =>
        p.name.toLowerCase().includes(part) ||
        part.includes(p.name.toLowerCase())
    )
  );
}

function calcProductCost(product, materialsMap) {
  return product.ingredients.reduce((sum, ing) => {
    const matId = typeof ing.material === "object" ? ing.material._id : ing.material;
    const mat   = materialsMap[matId];
    if (!mat || mat.pricePerGram == null) return sum;
    return sum + ing.gramPerServing * mat.pricePerGram;
  }, 0);
}

const DAY_ORDER = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];

const MONTH_NAMES_BN = [
  "জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন",
  "জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",
];

// ─── helpers ───────────────────────────────────────────────
const taka = (v) =>
  "৳" + Number(v).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const pctOf = (profit, rev) =>
  rev ? ((profit / rev) * 100).toFixed(1) + "%" : "0%";

function mealTypeIcon(type) {
  const icons = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙" };
  return icons[type] ?? "🍽️";
}
function mealTypeColor(type) {
  return { Breakfast: "text-orange-600", Lunch: "text-yellow-600", Dinner: "text-indigo-600" }[type] ?? "text-gray-700";
}

// ─── UI atoms ──────────────────────────────────────────────
function SummaryCard({ label, value, color, sub }) {
  const colors = {
    blue:   "bg-blue-50  border-blue-200  text-blue-700",
    red:    "bg-red-50   border-red-200   text-red-700",
    green:  "bg-green-50 border-green-200 text-green-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
  };
  return (
    <div className={`rounded-xl border p-4 text-center ${colors[color]}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-xl font-bold ${colors[color].split(" ")[2]}`}>{value}</div>
      {sub && <div className="text-xs mt-1 opacity-70">{sub}</div>}
    </div>
  );
}

function Th({ children }) {
  return <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">{children}</th>;
}
function Td({ children, colSpan }) {
  return <td className="px-4 py-3 text-gray-700" colSpan={colSpan}>{children}</td>;
}

// ─── Main component ────────────────────────────────────────
export default function DayWiseProfitReport() {
  const { data: orderData, isLoading: orderLoading } = useAllwiseInstituteUserOrderLists();

  const [products,     setProducts]     = useState([]);
  const [materialsMap, setMaterialsMap] = useState({});
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [activeTab,    setActiveTab]    = useState("weekly");
  const [expandedRow,  setExpandedRow]  = useState(null);

  // Load products & materials
  useEffect(() => {
    (async () => {
      try {
        const [prods, mats] = await Promise.all([
          apiFetch(API_PRODUCTS),
          apiFetch(API_MATERIALS),
        ]);
        setProducts(Array.isArray(prods) ? prods : []);
        const map = {};
        if (Array.isArray(mats)) mats.forEach((m) => { map[m._id] = m; });
        setMaterialsMap(map);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Collect all active meals
  const allMeals = useMemo(() => {
    if (!orderData) return [];
    const orders = Array.isArray(orderData) ? orderData : orderData?.data ?? [];
    return orders.flatMap((order) =>
      (order.meals ?? []).map((meal) => ({
        ...meal,
        // fallback: use order's createdAt if meal has no date
        _date: meal.date ?? meal.createdAt ?? order.createdAt ?? null,
      }))
    );
  }, [orderData]);

  // Per-meal cost calculator
  const getMealCost = useMemo(() => {
    return (meal) => {
      let total = 0;
      (meal.selected_items ?? []).forEach((item) => {
        matchProductByTitle(item.title, products).forEach((prod) => {
          total += calcProductCost(prod, materialsMap);
        });
      });
      return total;
    };
  }, [products, materialsMap]);

  // ── WEEKLY (day-wise) ──
  const dayWiseData = useMemo(() => {
    if (!allMeals.length || !products.length) return {};
    const result = {};

    allMeals.forEach((meal) => {
      if (!meal.is_on || !meal.balance_deducted) return;
      const day      = meal.day;
      const mealType = meal.meal_type;
      const price    = meal.package_price ?? 0;
      const cost     = getMealCost(meal);
      const profit   = price - cost;

      if (!result[day]) result[day] = {};
      if (!result[day][mealType]) {
        result[day][mealType] = { count: 0, totalPrice: 0, totalCost: 0, totalProfit: 0, ingredientDetails: [] };
      }

      result[day][mealType].count        += 1;
      result[day][mealType].totalPrice   += price;
      result[day][mealType].totalCost    += cost;
      result[day][mealType].totalProfit  += profit;

      // ingredient details (last meal)
      const details = [];
      (meal.selected_items ?? []).forEach((item) => {
        matchProductByTitle(item.title, products).forEach((prod) => {
          prod.ingredients.forEach((ing) => {
            const matId = typeof ing.material === "object" ? ing.material._id : ing.material;
            const mat   = materialsMap[matId];
            const c     = mat?.pricePerGram != null ? ing.gramPerServing * mat.pricePerGram : null;
            details.push({ productName: prod.name, matName: mat?.name ?? matId, gram: ing.gramPerServing, pricePerGram: mat?.pricePerGram ?? null, cost: c });
          });
        });
      });
      result[day][mealType].ingredientDetails = details;
    });

    return result;
  }, [allMeals, products, materialsMap, getMealCost]);

  const daySummary = useMemo(() => {
    return Object.entries(dayWiseData).map(([day, meals]) => ({
      day,
      meals,
      totalPrice:  Object.values(meals).reduce((s, m) => s + m.totalPrice,  0),
      totalCost:   Object.values(meals).reduce((s, m) => s + m.totalCost,   0),
      totalProfit: Object.values(meals).reduce((s, m) => s + m.totalProfit, 0),
    })).sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
  }, [dayWiseData]);

  // ── MONTHLY ──
  const monthlySummary = useMemo(() => {
    if (!allMeals.length || !products.length) return [];
    const map = {};

    allMeals.forEach((meal) => {
      if (!meal.is_on || !meal.balance_deducted) return;
      const raw = meal._date ? new Date(meal._date) : null;
      if (!raw || isNaN(raw)) return;

      const yr    = raw.getFullYear();
      const mo    = raw.getMonth();
      const key   = `${yr}-${String(mo).padStart(2,"0")}`;
      const label = `${MONTH_NAMES_BN[mo]} ${yr}`;
      const sort  = yr * 100 + mo;

      if (!map[key]) map[key] = { label, sort, totalPrice: 0, totalCost: 0, totalProfit: 0, count: 0, mealBreakdown: {} };

      const price  = meal.package_price ?? 0;
      const cost   = getMealCost(meal);
      const profit = price - cost;
      const mtype  = meal.meal_type ?? "অন্যান্য";

      map[key].count       += 1;
      map[key].totalPrice  += price;
      map[key].totalCost   += cost;
      map[key].totalProfit += profit;

      if (!map[key].mealBreakdown[mtype]) map[key].mealBreakdown[mtype] = { count:0, totalPrice:0, totalCost:0, totalProfit:0 };
      map[key].mealBreakdown[mtype].count       += 1;
      map[key].mealBreakdown[mtype].totalPrice  += price;
      map[key].mealBreakdown[mtype].totalCost   += cost;
      map[key].mealBreakdown[mtype].totalProfit += profit;
    });

    return Object.values(map).sort((a, b) => a.sort - b.sort);
  }, [allMeals, products, materialsMap, getMealCost]);

  // ── YEARLY ──
  const yearlySummary = useMemo(() => {
    const map = {};
    monthlySummary.forEach((m) => {
      const yr = m.label.split(" ")[1];
      if (!map[yr]) map[yr] = { label: yr, totalPrice: 0, totalCost: 0, totalProfit: 0, count: 0, months: [] };
      map[yr].totalPrice  += m.totalPrice;
      map[yr].totalCost   += m.totalCost;
      map[yr].totalProfit += m.totalProfit;
      map[yr].count       += m.count;
      map[yr].months.push(m);
    });
    return Object.values(map).sort((a, b) => Number(a.label) - Number(b.label));
  }, [monthlySummary]);

  // Grand totals per view
  const weekGrand   = useMemo(() => ({ price: daySummary.reduce((s,d)=>s+d.totalPrice,0), cost: daySummary.reduce((s,d)=>s+d.totalCost,0), profit: daySummary.reduce((s,d)=>s+d.totalProfit,0), count: daySummary.reduce((s,d)=>s+Object.values(d.meals).reduce((x,m)=>x+m.count,0),0) }), [daySummary]);
  const monthGrand  = useMemo(() => ({ price: monthlySummary.reduce((s,d)=>s+d.totalPrice,0), cost: monthlySummary.reduce((s,d)=>s+d.totalCost,0), profit: monthlySummary.reduce((s,d)=>s+d.totalProfit,0), count: monthlySummary.reduce((s,d)=>s+d.count,0) }), [monthlySummary]);
  const yearGrand   = useMemo(() => ({ price: yearlySummary.reduce((s,d)=>s+d.totalPrice,0), cost: yearlySummary.reduce((s,d)=>s+d.totalCost,0), profit: yearlySummary.reduce((s,d)=>s+d.totalProfit,0), count: yearlySummary.reduce((s,d)=>s+d.count,0) }), [yearlySummary]);

  const isLoading = loading || orderLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">হিসাব করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
        ⚠️ {error}
      </div>
    );
  }

  // ── RENDER ──
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Profit Report</h1>
          <p className="text-sm text-gray-500 mt-0.5">Revenue − Ingredient Cost = Profit</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { key: "weekly",  label: "সাপ্তাহিক" },
            { key: "monthly", label: "মাসিক" },
            { key: "yearly",  label: "বার্ষিক" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => { setActiveTab(t.key); setExpandedRow(null); }}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeTab === t.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════ WEEKLY TAB ═══════════ */}
        {activeTab === "weekly" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SummaryCard label="মোট Revenue"  value={taka(weekGrand.price)}  color="blue"   />
              <SummaryCard label="মোট খরচ"      value={taka(weekGrand.cost)}   color="red"    />
              <SummaryCard label="মোট লাভ"      value={taka(weekGrand.profit)} color="green"  />
              <SummaryCard label="Profit Margin" value={pctOf(weekGrand.profit, weekGrand.price)} color="purple" sub={`${weekGrand.count} টি অর্ডার`} />
            </div>

            {daySummary.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3">
                {daySummary.map(({ day, meals, totalPrice, totalCost, totalProfit }) => (
                  <div key={day} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedRow(expandedRow === day ? null : day)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800">{day}</span>
                        <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                          {Object.keys(meals).length} meal type
                        </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <StatBadge label="Revenue" value={taka(totalPrice)}  color="text-blue-700" />
                        <StatBadge label="খরচ"     value={taka(totalCost)}   color="text-red-600" />
                        <StatBadge label="লাভ"     value={taka(totalProfit)} color={totalProfit >= 0 ? "text-green-700 font-bold" : "text-red-600 font-bold"} />
                        <span className="text-gray-400 text-xs">{expandedRow === day ? "▲" : "▼"}</span>
                      </div>
                    </button>

                    {expandedRow === day && (
                      <div className="border-t border-gray-100">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <Th>Meal Type</Th>
                              <Th>অর্ডার</Th>
                              <Th>Package Price</Th>
                              <Th>Ingredient Cost</Th>
                              <Th>লাভ</Th>
                              <Th>লাভ/অর্ডার</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(meals).map(([mealType, data]) => (
                              <>
                                <tr key={mealType} className="border-t border-gray-50 hover:bg-gray-50">
                                  <Td>
                                    <span className={`font-medium ${mealTypeColor(mealType)}`}>
                                      {mealTypeIcon(mealType)} {mealType}
                                    </span>
                                  </Td>
                                  <Td>{data.count} টি</Td>
                                  <Td><span className="text-blue-700">{taka(data.totalPrice)}</span></Td>
                                  <Td><span className="text-red-600">{taka(data.totalCost)}</span></Td>
                                  <Td>
                                    <span className={`font-semibold ${data.totalProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                                      {data.totalProfit >= 0 ? "+" : ""}{taka(data.totalProfit)}
                                    </span>
                                  </Td>
                                  <Td>{taka(data.count > 0 ? data.totalProfit / data.count : 0)}</Td>
                                </tr>

                                {data.ingredientDetails.length > 0 && (
                                  <tr className="bg-blue-50/40">
                                    <td colSpan={6} className="px-4 py-3">
                                      <p className="text-xs font-medium text-gray-500 mb-2">📦 Ingredient Breakdown ({mealType})</p>
                                      <div className="flex flex-wrap gap-2">
                                        {data.ingredientDetails.map((ing, i) => (
                                          <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs">
                                            <span className="font-medium text-gray-700">{ing.matName}</span>
                                            <span className="text-gray-400 mx-1">·</span>
                                            <span className="text-gray-600">{ing.gram}g</span>
                                            {ing.cost != null && (
                                              <>
                                                <span className="text-gray-400 mx-1">=</span>
                                                <span className="text-red-600">৳{ing.cost.toFixed(4)}</span>
                                              </>
                                            )}
                                            <span className="text-gray-400 ml-1 text-[10px]">({ing.productName})</span>
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}

                            {/* Day total */}
                            <tr className="bg-gray-100 border-t border-gray-200 font-semibold">
                              <Td colSpan={2}><span className="text-gray-700">{day} মোট</span></Td>
                              <Td><span className="text-blue-700">{taka(totalPrice)}</span></Td>
                              <Td><span className="text-red-600">{taka(totalCost)}</span></Td>
                              <Td colSpan={2}>
                                <span className={`font-bold text-base ${totalProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                                  {totalProfit >= 0 ? "+" : ""}{taka(totalProfit)}
                                </span>
                              </Td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}

                {/* Weekly grand total */}
                <GrandTotalRow label="সপ্তাহের মোট" grand={weekGrand} />
              </div>
            )}
          </>
        )}

        {/* ═══════════ MONTHLY TAB ═══════════ */}
        {activeTab === "monthly" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SummaryCard label="মোট Revenue"  value={taka(monthGrand.price)}  color="blue"   />
              <SummaryCard label="মোট খরচ"      value={taka(monthGrand.cost)}   color="red"    />
              <SummaryCard label="মোট লাভ"      value={taka(monthGrand.profit)} color="green"  />
              <SummaryCard label="Profit Margin" value={pctOf(monthGrand.profit, monthGrand.price)} color="purple" sub={`${monthGrand.count} টি অর্ডার`} />
            </div>

            {monthlySummary.length === 0 ? (
              <EmptyState msg="কোনো monthly data পাওয়া যায়নি। meal এ date/createdAt field আছে কিনা চেক করুন।" />
            ) : (
              <div className="space-y-3">
                {monthlySummary.map((row) => (
                  <div key={row.label} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedRow(expandedRow === row.label ? null : row.label)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800">{row.label}</span>
                        <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                          {row.count} অর্ডার
                        </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <StatBadge label="Revenue" value={taka(row.totalPrice)}  color="text-blue-700" />
                        <StatBadge label="খরচ"     value={taka(row.totalCost)}   color="text-red-600" />
                        <StatBadge label="লাভ"     value={taka(row.totalProfit)} color={row.totalProfit >= 0 ? "text-green-700 font-bold" : "text-red-600 font-bold"} />
                        <span className="text-gray-400 text-xs">{expandedRow === row.label ? "▲" : "▼"}</span>
                      </div>
                    </button>

                    {expandedRow === row.label && (
                      <div className="border-t border-gray-100">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <Th>Meal Type</Th>
                              <Th>অর্ডার</Th>
                              <Th>Revenue</Th>
                              <Th>খরচ</Th>
                              <Th>লাভ</Th>
                              <Th>Margin</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(row.mealBreakdown).map(([mtype, d]) => (
                              <tr key={mtype} className="border-t border-gray-50 hover:bg-gray-50">
                                <Td>
                                  <span className={`font-medium ${mealTypeColor(mtype)}`}>
                                    {mealTypeIcon(mtype)} {mtype}
                                  </span>
                                </Td>
                                <Td>{d.count} টি</Td>
                                <Td><span className="text-blue-700">{taka(d.totalPrice)}</span></Td>
                                <Td><span className="text-red-600">{taka(d.totalCost)}</span></Td>
                                <Td>
                                  <span className={`font-semibold ${d.totalProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                                    {d.totalProfit >= 0 ? "+" : ""}{taka(d.totalProfit)}
                                  </span>
                                </Td>
                                <Td>{pctOf(d.totalProfit, d.totalPrice)}</Td>
                              </tr>
                            ))}
                            <tr className="bg-gray-100 border-t border-gray-200 font-semibold">
                              <Td colSpan={2}>{row.label} মোট</Td>
                              <Td><span className="text-blue-700">{taka(row.totalPrice)}</span></Td>
                              <Td><span className="text-red-600">{taka(row.totalCost)}</span></Td>
                              <Td colSpan={2}>
                                <span className={`font-bold text-base ${row.totalProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                                  {row.totalProfit >= 0 ? "+" : ""}{taka(row.totalProfit)}
                                  <span className="text-sm font-normal ml-2 text-gray-500">
                                    ({pctOf(row.totalProfit, row.totalPrice)})
                                  </span>
                                </span>
                              </Td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
                <GrandTotalRow label="সর্বমোট (সব মাস)" grand={monthGrand} />
              </div>
            )}
          </>
        )}

        {/* ═══════════ YEARLY TAB ═══════════ */}
        {activeTab === "yearly" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SummaryCard label="মোট Revenue"  value={taka(yearGrand.price)}  color="blue"   />
              <SummaryCard label="মোট খরচ"      value={taka(yearGrand.cost)}   color="red"    />
              <SummaryCard label="মোট লাভ"      value={taka(yearGrand.profit)} color="green"  />
              <SummaryCard label="Profit Margin" value={pctOf(yearGrand.profit, yearGrand.price)} color="purple" sub={`${yearGrand.count} টি অর্ডার`} />
            </div>

            {yearlySummary.length === 0 ? (
              <EmptyState msg="কোনো yearly data পাওয়া যায়নি। meal এ date/createdAt field আছে কিনা চেক করুন।" />
            ) : (
              <div className="space-y-3">
                {yearlySummary.map((yr) => (
                  <div key={yr.label} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedRow(expandedRow === yr.label ? null : yr.label)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800 text-lg">{yr.label}</span>
                        <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                          {yr.count} অর্ডার · {yr.months.length} মাস
                        </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <StatBadge label="Revenue" value={taka(yr.totalPrice)}  color="text-blue-700" />
                        <StatBadge label="খরচ"     value={taka(yr.totalCost)}   color="text-red-600" />
                        <StatBadge label="লাভ"     value={taka(yr.totalProfit)} color={yr.totalProfit >= 0 ? "text-green-700 font-bold" : "text-red-600 font-bold"} />
                        <span className="text-gray-400 text-xs">{expandedRow === yr.label ? "▲" : "▼"}</span>
                      </div>
                    </button>

                    {expandedRow === yr.label && (
                      <div className="border-t border-gray-100">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <Th>মাস</Th>
                              <Th>অর্ডার</Th>
                              <Th>Revenue</Th>
                              <Th>খরচ</Th>
                              <Th>লাভ</Th>
                              <Th>Margin</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {yr.months.map((m) => (
                              <tr key={m.label} className="border-t border-gray-50 hover:bg-gray-50">
                                <Td>{m.label}</Td>
                                <Td>{m.count} টি</Td>
                                <Td><span className="text-blue-700">{taka(m.totalPrice)}</span></Td>
                                <Td><span className="text-red-600">{taka(m.totalCost)}</span></Td>
                                <Td>
                                  <span className={`font-semibold ${m.totalProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                                    {m.totalProfit >= 0 ? "+" : ""}{taka(m.totalProfit)}
                                  </span>
                                </Td>
                                <Td>{pctOf(m.totalProfit, m.totalPrice)}</Td>
                              </tr>
                            ))}
                            <tr className="bg-gray-100 border-t border-gray-200 font-semibold">
                              <Td colSpan={2}>{yr.label} বার্ষিক মোট</Td>
                              <Td><span className="text-blue-700">{taka(yr.totalPrice)}</span></Td>
                              <Td><span className="text-red-600">{taka(yr.totalCost)}</span></Td>
                              <Td colSpan={2}>
                                <span className={`font-bold text-base ${yr.totalProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                                  {yr.totalProfit >= 0 ? "+" : ""}{taka(yr.totalProfit)}
                                  <span className="text-sm font-normal ml-2 text-gray-500">
                                    ({pctOf(yr.totalProfit, yr.totalPrice)})
                                  </span>
                                </span>
                              </Td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
                <GrandTotalRow label="সর্বমোট (সব বছর)" grand={yearGrand} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Shared sub-components ─────────────────────────────────
function StatBadge({ label, value, color }) {
  return (
    <div className="text-right">
      <div className="text-[10px] text-gray-400">{label}</div>
      <div className={`text-sm ${color}`}>{value}</div>
    </div>
  );
}

function GrandTotalRow({ label, grand }) {
  return (
    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between bg-gray-50">
        <span className="font-bold text-gray-800 text-base">{label}</span>
        <div className="flex items-center gap-5">
          <StatBadge label="Revenue" value={"৳" + grand.price.toFixed(2)}  color="text-blue-700 font-semibold" />
          <StatBadge label="খরচ"     value={"৳" + grand.cost.toFixed(2)}   color="text-red-600 font-semibold" />
          <StatBadge label="লাভ"     value={(grand.profit >= 0 ? "+" : "") + "৳" + grand.profit.toFixed(2)} color={`font-bold text-base ${grand.profit >= 0 ? "text-green-700" : "text-red-600"}`} />
          <div className="text-right">
            <div className="text-[10px] text-gray-400">Margin</div>
            <div className="text-sm font-semibold text-purple-700">{pctOf(grand.profit, grand.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ msg }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
      <div className="text-4xl mb-3">📊</div>
      {msg ?? "কোনো active order পাওয়া যায়নি"}
    </div>
  );
}
