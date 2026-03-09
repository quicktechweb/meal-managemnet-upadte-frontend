import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getInstituteUserDataFunction,
  getUserDataFunction,
  googleLoginFunction,
  instituteLoginFunction,
  instituteRegistrationFunction,
  instituteUserRegistrationFunction,
  loginFunction,
  registerFunction,
} from "./auth.api";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useInstituteAuth from "../../Hooks/useInstituteAuth";

export const useLogin = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload) => loginFunction(payload),
    onSuccess: (data) => {
      console.log(data);

      toast.success(data?.message);
      setToken(data?.token);

      if (data?.user?.role === "user") {
        navigate("/dashboard/dashboard");
      }

      if (data?.user?.role === "admin") {
        navigate("/admin/dashboard");
      }
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

        navigate("/#login");
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

export const useLogout = (token) => {};

export const useInstituteRegistration = () => {
  return useMutation({
    mutationKey: ["institute-registration"],
    mutationFn: (payload) => instituteRegistrationFunction(payload),
    onMutate: () => {},
    onSuccess: () => {},
    onError: (err) => {},
  });
};

export const useInstituteLogin = () => {
  const { setToken } = useInstituteAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["institute-login"],
    mutationFn: (payload) => instituteLoginFunction(payload),
    onSuccess: (data) => {
      console.log(data);

      setToken(data?.token);

      data?.user?.role === "institute_user" &&
        navigate("/dashboard/mealmanagement");
      data?.user?.role === "institute_admin" && navigate("/institute");

      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useInstituteUserRegistration = () => {
  return useMutation({
    mutationKey: ["institute-user-registration"],
    mutationFn: (payload) => instituteUserRegistrationFunction(payload),
    onMutate: () => {},
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useAuthInstituteUser = (token) => {
  return useQuery({
    queryKey: ["instituteUserData", token],
    queryFn: getInstituteUserDataFunction,
    retry: false,
    enabled: !!token,
    onError: (err) => {
      toast.error(err?.message);
    },
  });
};
