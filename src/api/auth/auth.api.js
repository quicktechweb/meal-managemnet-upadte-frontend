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
  const { data } = await axiosPublic.post("/api/firebaseAuth/google", payload);
  return data;
};

export const logoutFunction = async () => {
  const { data } = await axiosSecure.post("/api/log-out");
  return data;
};

export const instituteRegistrationFunction = async (payload) => {
  const data = await axiosPublic.post("/api/institute-registration", payload);
  return data;
};

export const instituteLoginFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/institute-login", payload);
  return data;
};

export const instituteUserRegistrationFunction = async (payload) => {
  const { data } = await axiosPublic.post(
    "/api/institute-user-registration",
    payload,
  );
  return data;
};

export const getInstituteUserDataFunction = async () => {
  const { data } = await axiosSecure("/api/instituteuser");
  return data;
};
