import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/feature/auth/authapi";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../Redux/feature/auth/authSlice";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { p } from "framer-motion/client";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      //  send correct field names
      const response = await login({ email, password }).unwrap();

      //  Dispatch login action
      dispatch(
        userLoggedIn({
          token: response.access,
          user: response.user_profile,
        })
      );

      //  Persist token & user
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: response.access,
          refresh: response.refresh,
          user: response.user_profile,
        })
      );

      toast.success("Login Successful 🎉", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error("Invalid email or password ❌", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#168FE5] px-4">
      <div className="w-full max-w-xl p-8 bg-white rounded-md shadow-md">
        {/* Logo */}
        <div className="flex flex-col items-center w-full mb-6">
          {/* Replace with your actual logo image */}
          <img src={logo} alt="Urgent Trades" />
        </div>

        <h1 className="mb-8 text-2xl font-medium text-center text-[#303030] font-roboto">
          Secure Dashboard Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-lg font-medium text-[#6C6C6C]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              className="w-full px-3 py-2 mb-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-lg font-medium text-[#6C6C6C]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 mb-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me */}
          <label className="inline-flex items-center gap-2 text-sm text-[#6C6C6C] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4"
            />
            Remember Me
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-md bg-[#3C2FA3] text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
