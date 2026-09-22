import React from "react";
import { auth, provider, signInWithPopup } from "../firebase/firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "../api/auth/auth.hook";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useGoogleLogin();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // const res = await axios.post(
      //   "https://alabadanbackendpart.alabadan.com/api/firebaseAuth/google",
      //   { token },
      // );

      await mutateAsync({ token });

      // if (res?.data?.success) {
      //   navigate("/dashboard/dashboard");
      // }

      // localStorage.setItem("token", JSON.stringify(res.data.token));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className=" text-black flex items-center justify-center gap-1 font-semibold cursor-pointer"
    >
      <FcGoogle /> Login with Google
    </button>
  );
};

export default GoogleLoginButton;
