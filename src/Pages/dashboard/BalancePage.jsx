import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BalancePage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Balance Lists</h2>
        <Link
          to={"/dashboards/add-balance"}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm text-sm transition"
        >
          <Plus size={18} />
          Add Balance
        </Link>
      </div>
    </div>
  );
};

export default BalancePage;
