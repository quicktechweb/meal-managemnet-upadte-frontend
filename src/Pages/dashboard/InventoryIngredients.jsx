import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useMemo, useState } from "react";
import { FaFileCsv, FaFilePdf, FaPlus, FaPrint, FaTrash } from "react-icons/fa";

const InventoryIngredients = ({ selectedDay, selectedMealType, summary }) => {
  const [ingredients, setIngredients] = useState({});
  const [ingredientForm, setIngredientForm] = useState({
    name: "",
    quantity: "",
  });

  // Ingredient key per day+mealType
  const ingredientKey = `${selectedDay}_${selectedMealType}`;

  const currentIngredients = useMemo(() => {
    return ingredients[ingredientKey] || [];
  }, [ingredients, ingredientKey]);

  const handleAddIngredient = () => {
    const { name, quantity } = ingredientForm;
    if (!name.trim() || !quantity) return;

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return;

    const totalQuantity = qty * totalSummaryCount;

    const newIngredient = {
      id: Date.now(),
      name: name.trim(),
      quantity: qty,
      totalQuantity,
    };

    setIngredients((prev) => ({
      ...prev,
      [ingredientKey]: [...(prev[ingredientKey] || []), newIngredient],
    }));

    setIngredientForm({ name: "", quantity: "" });
  };

  const handleRemoveIngredient = (id) => {
    setIngredients((prev) => ({
      ...prev,
      [ingredientKey]: (prev[ingredientKey] || []).filter(
        (ing) => ing.id !== id,
      ),
    }));
  };

  const totalSummaryCount = useMemo(() => {
    return summary
      .filter(
        (i) =>
          i.title.toLowerCase() !== "rice" && i.title.toLowerCase() !== "vat",
      )
      .reduce((acc, item) => acc + item.totalCount, 0);
  }, [summary]);

  // Recalculate totalQuantity when summary count changes
  useEffect(() => {
    if (!ingredientKey) return;
    setIngredients((prev) => {
      const existing = prev[ingredientKey];
      if (!existing || existing.length === 0) return prev;
      const updated = existing.map((ing) => ({
        ...ing,
        totalQuantity: ing.quantity * totalSummaryCount,
      }));
      return { ...prev, [ingredientKey]: updated };
    });
  }, [totalSummaryCount]);

  // ── Export helpers ──────────────────────────────────────────────
  const exportTitle = `Inventory Ingredients — ${selectedDay} (${selectedMealType})`;

  const tableHeaders = [
    "#",
    "Ingredient Name",
    "Qty / Person (gm)",
    "Total Count",
    "Total Qty (gm)",
    "Total Qty (kg)",
  ];

  const tableRows = (ingredients) =>
    ingredients.map((ing, i) => [
      i + 1,
      ing.name,
      ing.quantity,
      totalSummaryCount,
      (ing.quantity * totalSummaryCount).toFixed(2),
      ((ing.quantity * totalSummaryCount) / 1000).toFixed(3),
    ]);

  const grandTotalGm = currentIngredients
    .reduce((acc, ing) => acc + ing.quantity * totalSummaryCount, 0)
    .toFixed(2);
  const grandTotalKg = (
    currentIngredients.reduce(
      (acc, ing) => acc + ing.quantity * totalSummaryCount,
      0,
    ) / 1000
  ).toFixed(3);

  // CSV
  const handleExportCSV = () => {
    const rows = [
      tableHeaders,
      ...tableRows(currentIngredients),
      // ["", "Grand Total", "", "", `${grandTotalGm} gm`, `${grandTotalKg} kg`],
    ];
    const csvContent = rows
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedDay}_${selectedMealType}_ingredients.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(exportTitle, 14, 16);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Total Count: ${totalSummaryCount}`, 14, 23);
    doc.setTextColor(0);

    autoTable(doc, {
      startY: 28,
      head: [tableHeaders],
      body: [
        ...tableRows(currentIngredients),
        // ["", "Grand Total", "", "", `${grandTotalGm} gm`, `${grandTotalKg} kg`],
      ],
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9,
      },
      bodyStyles: { fontSize: 9 },
      footStyles: { fontStyle: "bold" },
      didParseCell(data) {
        const lastRow = data.table.body.length - 1;
        if (data.row.index === lastRow && data.section === "body") {
          data.cell.styles.fillColor = [219, 234, 254];
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    doc.save(`${selectedDay}_${selectedMealType}_ingredients.pdf`);
  };

  // Print
  const handlePrint = () => {
    const rows = tableRows(currentIngredients)
      .map(
        (r, i) => `
        <tr style="${i % 2 === 0 ? "background:#f9fafb" : ""}">
          ${r.map((cell) => `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${cell}</td>`).join("")}
        </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${exportTitle}</title>
  <style>
    body { font-family: sans-serif; font-size: 13px; padding: 24px; color: #111; }
    h2 { font-size: 16px; margin-bottom: 4px; }
    p  { color: #555; font-size: 12px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #3b82f6; color: #fff; padding: 8px 12px; text-align: left; font-size: 12px; }
    td { padding: 8px 12px; }
    @media print { button { display: none; } }
  </style>
</head>
<body>
  <h2>${exportTitle}</h2>
  <p>Total Count: ${totalSummaryCount}</p>
  <table>
    <thead>
      <tr>${tableHeaders.map((h) => `<th>${h}</th>`).join("")}</tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <script>window.onload=()=>window.print();<\/script>
</body>
</html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            Inventory Ingredients
          </h4>
          <p className="text-sm text-gray-500 mt-0.5">
            {selectedDay} — {selectedMealType} &nbsp;|&nbsp; Total count:{" "}
            <span className="font-semibold text-blue-600">
              {totalSummaryCount}
            </span>
          </p>
        </div>
      </div>

      {/* Add Ingredient Form */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
        <div className="flex flex-wrap items-end gap-3">
          {/* Ingredient Name */}
          <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
            <label className="text-xs font-semibold text-gray-600">
              Ingredient Name
            </label>
            <input
              type="text"
              placeholder="e.g. Turmeric,Oil..."
              value={ingredientForm.name}
              onChange={(e) =>
                setIngredientForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white"
            />
          </div>

          {/* Quantity per person */}
          <div className="flex flex-col gap-1 w-40">
            <label className="text-xs font-semibold text-gray-600">
              Qty per person (gm)
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={ingredientForm.quantity}
              onChange={(e) =>
                setIngredientForm((prev) => ({
                  ...prev,
                  quantity: e.target.value,
                }))
              }
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white"
            />
          </div>

          {/* Total (read-only preview) */}
          <div className="flex flex-col gap-1 w-40">
            <label className="text-xs font-semibold text-gray-600">
              Total Qty (gm)
            </label>
            <input
              type="number"
              readOnly
              value={
                ingredientForm.quantity
                  ? (
                      parseFloat(ingredientForm.quantity) * totalSummaryCount
                    ).toFixed(2)
                  : ""
              }
              placeholder="Auto calculated"
              className="text-sm border border-dashed border-blue-300 rounded-lg px-3 py-2 bg-blue-50 text-blue-700 font-medium focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
          >
            <FaPlus className="text-xs" />
            Add
          </button>
        </div>

        {/* Formula hint */}
        {totalSummaryCount > 0 && (
          <p className="text-xs text-gray-400 mt-3">
            Formula: Qty per person &times; {totalSummaryCount} (total count) =
            Total Qty
          </p>
        )}
      </div>

      {/* Export Buttons */}
      {currentIngredients.length > 0 && (
        <div className="flex items-center gap-2 mb-3 justify-end">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 active:scale-95 transition-all cursor-pointer"
          >
            <FaFileCsv className="text-sm" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
          >
            <FaPrint className="text-sm" />
            Print
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 active:scale-95 transition-all cursor-pointer"
          >
            <FaFilePdf className="text-sm" />
            Export PDF
          </button>
        </div>
      )}

      {/* Ingredients Table */}
      {currentIngredients.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  #
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Ingredient Name
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Qty / person (gm)
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Total Count
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Total Qty (gm)
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Total Qty (kg)
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentIngredients.map((ing, index) => (
                <tr
                  key={ing.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {ing.name}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {ing.quantity}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {totalSummaryCount}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-600">
                    {(ing.quantity * totalSummaryCount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-green-600">
                    {((ing.quantity * totalSummaryCount) / 1000).toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(ing.id)}
                      className="text-red-400 hover:text-red-600 transition cursor-pointer p-1"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-sm">
            No ingredients added yet for {selectedDay} — {selectedMealType}
          </p>
        </div>
      )}
    </div>
  );
};

export default InventoryIngredients;
