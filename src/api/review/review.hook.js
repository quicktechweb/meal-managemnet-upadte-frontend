import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getReviewListFunction,
  replyReviewFunction,
  updateReviewVisibilityFunction,
} from "./review.api";

export const useReviewList = (params) =>
  useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getReviewListFunction(params),
    keepPreviousData: true,
  });

export const useReplyReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: replyReviewFunction,
    onSuccess: () => {
      toast.success("Reply saved");
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  });
};

export const useUpdateReviewVisibility = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateReviewVisibilityFunction,
    onSuccess: (d) => {
      toast.success(
        d.review_visibility === "public"
          ? "Reviews are now public for your institute"
          : "Reviews are now private"
      );
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e) => toast.error(e?.response?.data?.message || "Failed"),
  });
};
