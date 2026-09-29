import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Globe, Lock, MessageSquare, Send, PenLine } from "lucide-react";
import {
  useReviewList,
  useReplyReview,
  useUpdateReviewVisibility,
} from "../../../../api/review/review.hook";

const MEAL_TABS = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

const Stars = ({ value = 0, size = 14 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        className={s <= value ? "fill-amber-400 text-amber-400" : "text-gray-300"}
      />
    ))}
  </div>
);

const ReviewCard = ({ item, isAdmin }) => {
  const [replyText, setReplyText] = useState(item.admin_reply || "");
  const [editing, setEditing] = useState(false);
  const reply = useReplyReview();

  const name = item.user_id?.information?.full_name || "User";

  const saveReply = () => {
    if (!replyText.trim()) return;
    reply.mutate(
      { id: item._id, admin_reply: replyText.trim() },
      { onSuccess: () => setEditing(false) }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {name}
              {item.is_mine && (
                <span className="ml-2 text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  You
                </span>
              )}
            </p>
            <p className="text-xs text-gray-400">
              {item.meal_type} · {item.meal_date}
              {isAdmin && item.user_id?.uid ? ` · ID ${item.user_id.uid}` : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Stars value={item.rating_overall} />
          {item.mood && <span className="text-lg leading-none">{item.mood}</span>}
        </div>
      </div>

      {(item.rating_taste || item.rating_quantity || item.rating_hygiene) && (
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-500">
          {item.rating_taste && <span>Taste: <b>{item.rating_taste}</b>/5</span>}
          {item.rating_quantity && <span>Quantity: <b>{item.rating_quantity}</b>/5</span>}
          {item.rating_hygiene && <span>Hygiene: <b>{item.rating_hygiene}</b>/5</span>}
        </div>
      )}

      {item.comment && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.comment}</p>
      )}

      {/* Admin reply (shob user dekhbe) */}
      {item.admin_reply && !editing && (
        <div className="mt-3 rounded-xl bg-gray-50 border-l-2 border-blue-400 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
            Institute reply
          </p>
          <p className="text-sm text-gray-600">{item.admin_reply}</p>
        </div>
      )}

      {isAdmin && (
        <div className="mt-3">
          {editing ? (
            <div className="flex gap-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 text-sm rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                onClick={saveReply}
                disabled={reply.isPending}
                className="px-3 rounded-xl bg-gray-900 text-white text-sm flex items-center gap-1 disabled:opacity-50"
              >
                <Send size={14} /> Send
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              <MessageSquare size={13} />
              {item.admin_reply ? "Edit reply" : "Reply"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const MealReviews = () => {
  const [meal, setMeal] = useState("All");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useReviewList({ meal_type: meal, page, limit: 10 });
  const visibilityMutation = useUpdateReviewVisibility();

  const isAdmin = data?.is_admin;
  const isPublic = data?.review_visibility === "public";
  const countFor = (m) =>
    m === "All"
      ? (data?.by_meal || []).reduce((a, b) => a + b.count, 0)
      : data?.by_meal?.find((x) => x.meal_type === m)?.count || 0;

  const totalPages = Math.max(1, Math.ceil((data?.total || 0) / 10));

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Meal Reviews</h1>
          <p className="text-sm text-gray-400">
            {isAdmin
              ? "See what your members say about each meal"
              : data?.can_see_all
              ? "Reviews from your institute"
              : "Only your own reviews are visible right now"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isAdmin && (
            <Link
              to={`/dashboards/mealfeedbackform${meal !== "All" ? `?meal=${meal}` : ""}`}
              className="px-3.5 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium flex items-center gap-1.5"
            >
              <PenLine size={14} /> Write review{meal !== "All" ? ` (${meal})` : ""}
            </Link>
          )}
        </div>
      </div>

      {/* Admin: public/private status */}
      {isAdmin && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isPublic ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
              }`}
            >
              {isPublic ? <Globe size={16} /> : <Lock size={16} />}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Status: {isPublic ? "Public" : "Private"}
              </p>
              <p className="text-xs text-gray-400">
                {isPublic
                  ? "All users of your institute can see every review"
                  : "Only you can see reviews. Users see just their own"}
              </p>
            </div>
          </div>
          <button
            onClick={() => visibilityMutation.mutate(isPublic ? "private" : "public")}
            disabled={visibilityMutation.isPending}
            className={`px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 ${
              isPublic
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isPublic ? "Make private" : "Make public"}
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
        <div className="text-3xl font-extrabold text-gray-800">{data?.avg_rating ?? "0.0"}</div>
        <div>
          <Stars value={Math.round(Number(data?.avg_rating || 0))} size={18} />
          <p className="text-xs text-gray-400 mt-1">
            {data?.total ?? 0} review{data?.total === 1 ? "" : "s"}
            {meal !== "All" ? ` for ${meal}` : ""}
          </p>
        </div>
      </div>

      {/* Meal tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {MEAL_TABS.map((m) => (
          <button
            key={m}
            onClick={() => { setMeal(m); setPage(1); }}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
              meal === m
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {m} <span className="opacity-60 text-xs ml-1">{countFor(m)}</span>
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : data?.feedbacks?.length ? (
        <div className="space-y-3">
          {data.feedbacks.map((f) => (
            <ReviewCard key={f._id} item={f} isAdmin={isAdmin} />
          ))}
        </div>
      ) : (
        <div className="text-center text-sm text-gray-400 py-16 bg-white rounded-2xl border border-gray-100">
          No reviews yet{meal !== "All" ? ` for ${meal}` : ""}.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-lg bg-white border border-gray-100 text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-gray-500">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg bg-white border border-gray-100 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MealReviews;
