import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { axiosSecure } from "../../Hooks/useAxiosSecure";

export const loginFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/auth/login", payload);
  return data;
};

export const registerFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/auth/signup", payload);
  return data;
};

export const getUserDataFunction = async () => {
  const { data } = await axiosSecure("/api/auth/me");
  return data;
};

export const googleLoginFunction = async (payload) => {
  const { data } = await axiosPublic("/api/firebaseAuth/google", payload);

  return data;
};
