import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserDataFunction,
  googleLoginFunction,
  loginFunction,
  registerFunction,
} from "./auth.api";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload) => loginFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      setToken(data?.token);
      navigate("/dashboard/dashboard");
    },
    onError: (err) => {
      console.log(err);

      toast.error(err?.response?.data?.error);
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (payload) => registerFunction(payload),
    onMutate: () => {},
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.message);
        setInterval(() => {
          navigate("/#login");
        }, 1000);
      }
    },
    onError: (err) => {},
  });
};

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  return useMutation({
    mutationKey: "google-login",
    mutationFn: (payload) => googleLoginFunction(payload),
    onSuccess: (data) => {
      console.log(data, "google data");

      toast.success(data?.message);
      setToken(data?.token);
      // navigate("/dashboard/dashboard");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
};

export const useGetUserData = (token) => {
  return useQuery({
    queryKey: ["userData", token],
    queryFn: getUserDataFunction,
    retry: false,
    enabled: !!token,
    onError: (err) => {
      toast.error(err?.message);
    },
  });
};
