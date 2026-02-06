import React from "react";
import { auth, provider, signInWithPopup } from "../firebase/firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post(
        "http://localhost:5000/api/firebaseAuth/google",
        { token },
      );

      toast.success(res.data.message);

      console.log(res?.data);

      if (res?.data?.success) {
        navigate("/dashboard/dashboard");
      }

      localStorage.setItem("token", JSON.stringify(res.data.token));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-black flex items-center justify-center gap-2 rounded-2xl shadow px-4 py-2 font-semibold cursor-pointer"
    >
      <FcGoogle /> Login with Google
    </button>
  );
};

export default GoogleLoginButton;
