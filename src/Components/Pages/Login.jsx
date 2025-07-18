import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// import logo from "../assets/urgent-trades-logo.svg"; // <-- add your logo path

const VALID_CREDENTIALS = {
  email: "admin@gmail.com",
  password: "admin123",
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const ok =
      email.trim().toLowerCase() === VALID_CREDENTIALS.email &&
      pw === VALID_CREDENTIALS.password;

    if (ok) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      // simulate short delay before navigation (lets toast show)
      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Invalid email or password.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#168FE5] px-4">
      <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md">
        {/* Logo */}
        <div className="flex flex-col items-center w-full mb-6">
          {/* Replace with your actual logo image */}
          {/* <img src={logo} alt="Urgent Trades" className="h-10 mb-2" /> */}
          <div className="leading-tight text-center">
            <span className="block text-lg font-bold text-[#ff3b3b]">
              Urgent
            </span>
            <span className="block text-sm font-medium text-[#1a73e8] -mt-1">
              Trades
            </span>
          </div>
        </div>

        <h1 className="mb-8 text-xl font-medium text-center">
          Secure Dashboard Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••••••••"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          {/* Remember Me */}
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
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
