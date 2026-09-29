import { axiosSecure } from "../../Hooks/useAxiosSecure";

export const getReviewListFunction = async (params) => {
  const { data } = await axiosSecure.get("/api/feedback/list", { params });
  return data;
};

export const submitReviewFunction = async (payload) => {
  const { data } = await axiosSecure.post("/api/feedback", payload);
  return data;
};

export const replyReviewFunction = async ({ id, admin_reply }) => {
  const { data } = await axiosSecure.patch(`/api/feedback/${id}/reply`, { admin_reply });
  return data;
};

export const updateReviewVisibilityFunction = async (review_visibility) => {
  const { data } = await axiosSecure.patch("/api/feedback/settings", { review_visibility });
  return data;
};
