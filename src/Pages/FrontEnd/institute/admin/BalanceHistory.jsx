import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownCircle, ArrowUpCircle, Search,
  TrendingUp, TrendingDown, Wallet, SlidersHorizontal
} from "lucide-react";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";

const fmtAmount = (n) => "৳" + Number(n).toLocaleString("en-BD");
const fmtDate = (d) =>
  new Date(d).toLocaleString("en-BD", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

const TYPE_CONFIG = {
  credit: {
    label: "Credit",
    textColor: "text-emerald-600",
    amountBg: "bg-emerald-50/80",
    iconGradient: "from-emerald-400 to-teal-500",
    badge: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
    dot: "bg-emerald-400",
    icon: ArrowDownCircle,
    sign: "+",
  },
  debit: {
    label: "Debit",
    textColor: "text-rose-500",
    amountBg: "bg-rose-50/80",
    iconGradient: "from-rose-400 to-pink-500",
    badge: "bg-rose-50 text-rose-500 ring-1 ring-rose-200",
    dot: "bg-rose-400",
    icon: ArrowUpCircle,
    sign: "−",
  },
};

const FILTERS = ["all", "credit", "debit"];

const BalanceHistory = () => {
  const { user } = useInstituteAuth();
  const currentBalance = user?.user?.balance ?? 0;
  const rawHistory = user?.user?.balance_history ?? [];

  const transactions = useMemo(
    () => [...rawHistory].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [rawHistory]
  );

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const stats = useMemo(() => ({
    totalCredit: transactions.filter((t) => t.type === "credit").reduce((a, t) => a + t.amount, 0),
    totalDebit: transactions.filter((t) => t.type === "debit").reduce((a, t) => a + t.amount, 0),
    total: transactions.length,
  }), [transactions]);

  const filtered = useMemo(() => {
    let list = transactions;
    if (filter !== "all") list = list.filter((t) => t.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) => t.note?.toLowerCase().includes(q) || t.ref?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [transactions, filter, search]);

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ══ Hero card ══ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl">
          {/* decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-white/[0.03]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-1">Current Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-orange-400 text-2xl font-bold">৳</span>
                <span className="text-white text-4xl md:text-5xl font-bold tracking-tight">
                  {Number(currentBalance).toLocaleString("en-BD")}
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-2">
                {user?.user?.information?.full_name ?? "User"} · UID {user?.user?.uid ?? "—"}
              </p>
            </div>

            {/* Mini stats inside hero */}
            <div className="flex gap-3">
              <div className="bg-white/5 backdrop-blur rounded-2xl px-4 py-3 text-center">
                <p className="text-emerald-400 text-lg font-bold">{fmtAmount(stats.totalCredit)}</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">In</p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl px-4 py-3 text-center">
                <p className="text-rose-400 text-lg font-bold">{fmtAmount(stats.totalDebit)}</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">Out</p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl px-4 py-3 text-center">
                <p className="text-white text-lg font-bold">{stats.total}</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">Txns</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Stat row ══ */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: TrendingUp, label: "Total In", value: fmtAmount(stats.totalCredit), color: "text-emerald-600", ring: "ring-emerald-100", iconBg: "bg-emerald-50" },
            { icon: TrendingDown, label: "Total Out", value: fmtAmount(stats.totalDebit), color: "text-rose-500", ring: "ring-rose-100", iconBg: "bg-rose-50" },
            { icon: Wallet, label: "Transactions", value: stats.total, color: "text-slate-700", ring: "ring-slate-100", iconBg: "bg-slate-50" },
          ].map(({ icon: Icon, label, value, color, ring, iconBg }) => (
            <div key={label} className={`bg-white rounded-2xl p-4 ring-1 ${ring} shadow-sm`}>
              <div className={`w-8 h-8 ${iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={15} className={color} />
              </div>
              <p className={`text-lg font-bold ${color}`}>{value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* ══ Search + Filter ══ */}
        <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all text-gray-700 placeholder:text-gray-300"
            />
          </div>

          <div className="flex gap-2 items-center">
            <SlidersHorizontal size={13} className="text-gray-300 shrink-0" />
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-4 py-2.5 rounded-xl font-semibold transition-all capitalize
                  ${filter === f
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ══ Transaction list ══ */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Transactions</p>
            <p className="text-xs text-gray-300">{filtered.length} results</p>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl ring-1 ring-gray-100 p-14 text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wallet size={22} className="text-gray-200" />
                </div>
                <p className="text-sm font-medium text-gray-400">No transactions found</p>
                <p className="text-xs text-gray-300 mt-1">Try a different filter or search term</p>
              </motion.div>
            ) : (
              filtered.map((tx, i) => {
                const cfg = TYPE_CONFIG[tx.type];
                if (!cfg) return null;
                const Icon = cfg.icon;

                return (
                  <motion.div
                    key={tx._id || i}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2, delay: Math.min(i * 0.04, 0.3) }}
                    className="group bg-white rounded-2xl ring-1 ring-gray-100 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:ring-gray-200 transition-all duration-200"
                  >
                    {/* Icon */}
                    <div className={`relative w-11 h-11 rounded-2xl bg-gradient-to-br ${cfg.iconGradient} flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon size={18} className="text-white" />
                    </div>

                    {/* Middle info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {tx.note || "Balance updated"}
                        </p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {fmtDate(tx.createdAt)}
                        {tx.ref && (
                          <span className="ml-2 px-1.5 py-0.5 bg-gray-50 rounded text-gray-400 font-mono text-[10px]">
                            {tx.ref}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className={`text-right shrink-0 px-3 py-2 rounded-xl ${cfg.amountBg}`}>
                      <p className={`text-base font-bold ${cfg.textColor} tabular-nums`}>
                        {cfg.sign}{fmtAmount(tx.amount)}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5 tabular-nums">
                        bal {fmtAmount(tx.balance_after)}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {transactions.length === 0 && (
          <p className="text-center text-xs text-gray-300 pb-6">
            Transactions will appear here once your balance is updated.
          </p>
        )}
      </div>
    </div>
  );
};

export default BalanceHistory;
