import { axiosPublic } from "../../Hooks/useAxiosPublic";

export const resetPasswordFn = async ({ identifier, new_password }) =>
  (await axiosPublic.post("/api/forgot-password/reset", { identifier, new_password })).data;

export const apiError = (e, fallback = "Something went wrong") =>
  e?.response?.data?.message || fallback;