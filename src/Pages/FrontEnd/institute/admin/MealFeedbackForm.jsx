import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, ChefHat, Droplets, Package } from "lucide-react";
import axios from "axios";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";

const MOODS = [
  { emoji: "😍", label: "Excellent" },
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😞", label: "Bad" },
  { emoji: "🤢", label: "Terrible" },
];

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const RATING_FIELDS = [
  { key: "rating_taste",    label: "Taste",    icon: ChefHat },
  { key: "rating_quantity", label: "Quantity", icon: Package },
  { key: "rating_hygiene",  label: "Hygiene",  icon: Droplets },
];

const OVERALL_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

/* ── Star SVG ── */
const StarIcon = ({ filled, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      stroke={filled ? "#f59e0b" : "#d1d5db"}
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill={filled ? "#fbbf24" : "#f3f4f6"}
    />
  </svg>
);

/* ── Reusable star row ── */
const StarRow = ({ value, onChange, size = 24 }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => onChange(s)}
        className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
      >
        <StarIcon filled={s <= value} size={size} />
      </button>
    ))}
  </div>
);

/* ══════════════════════════════════════════
   Main Component
══════════════════════════════════════════ */
const MealFeedbackForm = () => {
  const { user } = useInstituteAuth();
  const today = new Date().toISOString().split("T")[0];

  const defaultForm = {
    meal_type: "Lunch",
    meal_date: today,
    rating_overall: 0,
    rating_taste: 0,
    rating_quantity: 0,
    rating_hygiene: 0,
    mood: "",
    comment: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async () => {
    if (!form.rating_overall) return setError("Please give an overall rating.");
    if (!form.mood) return setError("Please select your mood.");
    setError("");
    setLoading(true);
    try {
      await axios.post("https://meal-management-backend-update-3.onrender.com/api/feedback", {
        user_id:      user?.user?._id,
        institute_id: user?.user?.institute_id,
        ...form,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #00b37e, #00875a)" }}
          >
            <CheckCircle size={30} color="white" />
          </motion.div>

          <h2
            className="text-2xl font-extrabold text-gray-900 mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Thank you!
          </h2>
          <p className="text-sm text-gray-400 mb-8">
            Your feedback for{" "}
            <span className="font-semibold text-gray-600">{form.meal_type}</span>{" "}
            has been submitted successfully.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm(defaultForm); }}
            className="w-full py-3.5 rounded-2xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div className="min-h-screen" style={{ background: "#f7f8fc", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Hero Header ── */}
        <div
          className="relative overflow-hidden px-6 pt-10 pb-14"
          style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 60%, #16213e 100%)" }}
        >
          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,180,50,0.18) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-1/4 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(100,220,180,0.12) 0%, transparent 70%)", transform: "translateY(40%)" }} />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 mb-4 text-xs tracking-widest uppercase"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}>
            🍽️ Hostel Dining
          </div>

          <h1
            className="text-3xl leading-tight font-extrabold text-white mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            How was your{" "}
            <span style={{ background: "linear-gradient(90deg, #ffb432, #ff7c5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              meal today?
            </span>
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Your feedback shapes tomorrow's menu
          </p>
        </div>

        {/* ── Form Body ── */}
        <div className="max-w-4xl mx-auto px-4 mt-4 pb-12 space-y-3">

          {/* Meal Selector */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl shadow-sm p-5 space-y-4"
            style={{ border: "0.5px solid rgba(0,0,0,0.06)" }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Select Meal</p>
            <div className="grid grid-cols-4 gap-2">
              {MEAL_TYPES.map((m) => (
                <button
                  key={m}
                  onClick={() => set("meal_type", m)}
                  className="py-2.5 rounded-xl text-xs font-semibold transition-all"
                  style={form.meal_type === m
                    ? { background: "#0f0f0f", color: "#fff", border: "1.5px solid #0f0f0f" }
                    : { background: "#f9fafb", color: "#6b7280", border: "1.5px solid transparent" }}
                >
                  {m}
                </button>
              ))}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Date</p>
              <input
                type="date"
                value={form.meal_date}
                max={today}
                onChange={(e) => set("meal_date", e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl text-gray-700 outline-none focus:ring-2"
                style={{ background: "#f9fafb", border: "1px solid #e5e7eb", fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          </motion.div>

          {/* Overall Rating */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-5"
            style={{ border: "0.5px solid rgba(0,0,0,0.06)" }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-4">Overall Rating</p>
            <div className="flex flex-col items-center gap-3">
              <StarRow value={form.rating_overall} onChange={(v) => set("rating_overall", v)} size={36} />
              <p className="text-sm font-medium text-gray-400">
                {OVERALL_LABELS[form.rating_overall] || "Tap a star to rate"}
              </p>
            </div>
          </motion.div>

          {/* Sub Ratings */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl shadow-sm p-5 space-y-3"
            style={{ border: "0.5px solid rgba(0,0,0,0.06)" }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Rate Each Aspect</p>
            {RATING_FIELDS.map(({ key, label, icon: Icon }, idx) => (
              <div key={key}>
                {idx > 0 && <div className="border-t border-gray-50 mb-3" />}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                      <Icon size={14} className="text-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                  <StarRow value={form[key]} onChange={(v) => set(key, v)} size={20} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mood */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-5"
            style={{ border: "0.5px solid rgba(0,0,0,0.06)" }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-4">How did you feel?</p>
            <div className="flex justify-between gap-1.5">
              {MOODS.map(({ emoji, label }) => (
                <motion.button
                  key={emoji}
                  onClick={() => set("mood", emoji)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.93 }}
                  className="flex-1 flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-2xl transition-all"
                  style={form.mood === emoji
                    ? { background: "#0f0f0f", border: "1.5px solid #0f0f0f", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }
                    : { background: "#f9fafb", border: "1.5px solid transparent" }}
                >
                  <span className="text-2xl leading-none">{emoji}</span>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: form.mood === emoji ? "rgba(255,255,255,0.7)" : "#9ca3af" }}
                  >
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Comment */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl shadow-sm p-5"
            style={{ border: "0.5px solid rgba(0,0,0,0.06)" }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-3">
              Comments{" "}
              <span className="normal-case tracking-normal font-normal text-gray-300">(optional)</span>
            </p>
            <textarea
              value={form.comment}
              onChange={(e) => set("comment", e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Tell us more about your experience..."
              className="w-full px-3 py-2.5 text-sm rounded-xl text-gray-700 resize-none outline-none focus:ring-2"
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: "1.6",
              }}
            />
            <p className="text-[10px] text-gray-300 text-right mt-1">{form.comment.length}/500</p>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-500 text-center rounded-xl px-4 py-3"
                style={{ background: "#fff1f0", border: "1px solid #ffccc7" }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            whileHover={{ y: -2, boxShadow: "0 14px 36px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.985 }}
            className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-shadow"
            style={{
              background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)",
              fontFamily: "'Syne', sans-serif",
              fontSize: "15px",
              letterSpacing: "0.02em",
            }}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={15} />
                Submit Feedback
              </>
            )}
          </motion.button>

          <div className="h-2" />
        </div>
      </div>
    </>
  );
};

export default MealFeedbackForm;
