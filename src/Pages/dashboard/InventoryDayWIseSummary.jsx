import React, { useMemo } from "react";

const InventoryDayWIseSummary = ({
  instituteData,
  selectedDay,
  selectedMealType,
  measures,
  globalAmount,
  getEffectiveAmount,
}) => {
  const summary = useMemo(() => {
    if (instituteData?.length === 0) return [];

    const summaryMap = {};

    instituteData.forEach((institute) => {
      institute.items.forEach((item) => {
        const key = `${institute.instituteId}_${item.title}`;
        const effectiveAmount = getEffectiveAmount(key);
        const totalKg = (item.count * effectiveAmount) / 1000;

        if (!summaryMap[item.title]) {
          summaryMap[item.title] = { totalCount: 0, totalKg: 0 };
        }
        summaryMap[item.title].totalCount += item.count;
        summaryMap[item.title].totalKg += totalKg;
      });
    });

    return Object.entries(summaryMap).map(([title, values]) => ({
      title,
      ...values,
    }));
  }, [instituteData, measures, globalAmount]);

  // ── CSV ──────────────────────────────────────────────
  const handleCSVDownload = () => {
    const headers = ["#", "Item Name", "Total Quantity", "Total Amount (kg)"];
    const rows = summary.map((item, i) => [
      i + 1,
      item.title,
      item.totalCount,
      item.totalKg.toFixed(2),
    ]);

    const grandTotal = [
      "",
      "Grand Total",
      summary.reduce((s, i) => s + i.totalCount, 0),
      summary.reduce((s, i) => s + i.totalKg, 0).toFixed(2),
    ];

    const csvContent = [headers, ...rows, [], grandTotal]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inventory_${selectedDay}_${selectedMealType}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ── PDF ──────────────────────────────────────────────
  const handlePDFDownload = () => {
    const printContent = buildPrintHTML();
    const win = window.open("", "_blank");
    win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Inventory - ${selectedDay} - ${selectedMealType}</title>
        <style>
          body { font-family: sans-serif; padding: 32px; color: #1a1a1a; }
          h2 { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
          p { font-size: 13px; color: #666; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th { text-align: left; font-size: 11px; text-transform: uppercase;
               letter-spacing: 0.05em; color: #888; padding: 8px 12px;
               border-bottom: 1px solid #e5e7eb; }
          th.right { text-align: right; }
          td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; }
          td.right { text-align: right; }
          .grand td { border-top: 2px solid #e5e7eb; border-bottom: none;
                      font-weight: 600; padding-top: 12px; }
          .qty { display: inline-block; background: #eff6ff; color: #1d4ed8;
                 border-radius: 12px; padding: 2px 10px; font-size: 12px; }
          .kg { color: #065f46; font-weight: 500; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
      win.close();
    }, 400);
  };

  // ── Print ─────────────────────────────────────────────
  const handlePrint = () => {
    const printContent = buildPrintHTML();
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = `
    <style>
      body { font-family: sans-serif; padding: 32px; color: #1a1a1a; }
      h2 { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
      p { font-size: 13px; color: #666; margin-bottom: 24px; }
      table { width: 100%; border-collapse: collapse; font-size: 13px; }
      th { text-align: left; font-size: 11px; text-transform: uppercase;
           letter-spacing: 0.05em; color: #888; padding: 8px 12px;
           border-bottom: 1px solid #e5e7eb; }
      th.right { text-align: right; }
      td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; }
      td.right { text-align: right; }
      .grand td { border-top: 2px solid #e5e7eb; border-bottom: none;
                  font-weight: 600; padding-top: 12px; }
      .qty { display: inline-block; background: #eff6ff; color: #1d4ed8;
             border-radius: 12px; padding: 2px 10px; font-size: 12px; }
      .kg { color: #065f46; font-weight: 500; }
    </style>
    ${printContent}
  `;
    window.print();
    document.body.innerHTML = originalBody;
    window.location.reload();
  };

  // ── Shared HTML builder ───────────────────────────────
  const buildPrintHTML = () => {
    const rows = summary
      .map(
        (item, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${item.title}</td>
          <td class="right"><span class="qty">${item.totalCount}</span></td>
          <td class="right"><span class="kg">${item.totalKg.toFixed(2)}</span></td>
        </tr>`,
      )
      .join("");

    const grandQty = summary.reduce((s, i) => s + i.totalCount, 0);
    const grandKg = summary.reduce((s, i) => s + i.totalKg, 0).toFixed(2);

    return `
    <h2>Inventory Summary</h2>
    <p>${selectedDay} &nbsp;·&nbsp; ${selectedMealType}</p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th class="right">Quantity</th>
          <th class="right">Total (kg)</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr class="grand">
          <td colspan="2">Grand Total</td>
          <td class="right">${grandQty}</td>
          <td class="right">${grandKg} kg</td>
        </tr>
      </tfoot>
    </table>
  `;
  };

  return (
    <div>
      {" "}
      {summary.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-4">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <h2 className="text-sm font-semibold text-gray-800">
                Overall summary
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                {selectedDay} · {selectedMealType}
              </span>

              {/* CSV */}
              <button
                onClick={handleCSVDownload}
                title="Download CSV"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                CSV
              </button>

              {/* PDF */}
              <button
                onClick={handlePDFDownload}
                title="Download PDF"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                PDF
              </button>

              {/* Print */}
              <button
                onClick={handlePrint}
                title="Print"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print
              </button>
            </div>
          </div>

          <div className="p-5">
            {/* Metric Cards */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              <div className="bg-gray-50 rounded-lg p-3.5">
                <p className="text-xs text-gray-400 mb-1">Total items</p>
                <p className="text-xl font-medium text-gray-800">
                  {summary.length}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3.5">
                <p className="text-xs text-gray-400 mb-1">Total quantity</p>
                <p className="text-xl font-medium text-gray-800">
                  {summary.reduce((s, i) => s + i.totalCount, 0)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3.5">
                <p className="text-xs text-gray-400 mb-1">Grand total</p>
                <p className="text-xl font-medium text-emerald-700">
                  {summary.reduce((s, i) => s + i.totalKg, 0).toFixed(2)}
                  <span className="text-xs text-gray-400 ml-1">kg</span>
                </p>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide pb-2 w-8">
                    #
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide pb-2">
                    Item
                  </th>
                  <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wide pb-2">
                    Qty
                  </th>
                  <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wide pb-2">
                    Total (kg)
                  </th>
                </tr>
              </thead>
              <tbody>
                {summary.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2.5 text-gray-300 text-xs">
                      {index + 1}
                    </td>
                    <td className="py-2.5">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                        <span className="text-gray-700">{item.title}</span>
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="inline-flex items-center justify-center min-w-7 h-6 px-2 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                        {item.totalCount}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-medium text-emerald-600">
                      {item.totalKg > 0 ? item.totalKg.toFixed(2) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={2}
                    className="pt-3 text-xs font-medium text-gray-400 uppercase tracking-wide"
                  >
                    Grand total
                  </td>
                  <td className="pt-3 text-right font-medium text-gray-700">
                    {summary.reduce((s, i) => s + i.totalCount, 0)}
                  </td>
                  <td className="pt-3 text-right font-semibold text-emerald-700">
                    {summary.reduce((s, i) => s + i.totalKg, 0).toFixed(2)} kg
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDayWIseSummary;
