import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaApple } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../../assets/kev-login.png";
import logo from "../../assets/logo.png";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");

  //   const [login] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Admin Login Check
    if (email === "admin@gmail.com" && password === "admin@gmail.com") {
      navigate("/"); // ✅ Redirect to admin dashboard
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between items-center h-full 2xl:h-screen ">
      {/* Left Form Section */}
      <div className=" w-full 2xl:w-1/2 flex flex-col justify-center p-4  md:p-8 bg-white h-full poppins ">
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className=" mt-4 mb-4" />
        </div>
        <div className="md:px-12 px-4">
          <h2 className="text-2xl poppins lg:text-[38px] font-medium mt-6 mb-2 text-left text-[#333333]">
            Welcome!
          </h2>
          <p className="text-base poppins font-medium mt-6 mb-9 text-[#333333]">
            Enter your Credentials to access your account
          </p>
          <div></div>
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-3 mt-6  justify-center items-center"
          >
            
            <div className="flex flex-col mt-2 mb-7">
              <label
                htmlFor="email"
                className="poppins mb-2 font-medium text-sm"
              >
                Email address
              </label>
              <input
                type="name"
                name="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-[#1D1D1D59]  bg-transparent  montserrat placeholder:text-[#00000080] rounded-xl mt-1"
                required
              />
            </div>

            <div className="flex flex-col mt-6">
              <label className="poppins mb-3 font-medium text-sm flex justify-between items-center">
                Password
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="flex items-center gap-1 text-sm font-normal text-black"
                >
                  {showPassword ? (
                    <>
                      <FaEyeSlash /> Hide
                    </>
                  ) : (
                    <>
                      <FaEye /> Show
                    </>
                  )}
                </button>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 border border-[#1D1D1D59] bg-transparent montserrat placeholder:text-[#00000080] rounded-xl"
                required
              />
            </div>

            <div className="flex md:flex-row flex-col gap-3 items-start justify-between lg:items-center text-sm mb-9">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" required />
                Remember me
              </label>

              <NavLink
                to="/forgot"
                className="text-[#009038] hover:underline poppins mb-6 "
              >
                Forgot Password?
              </NavLink>
            </div>
            {errorMessage && (
              <div className="mt-4  text-red-700 px-4 py-2 rounded text-sm animate-pulse">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="px-12 bg-[#009038] text-[#000000] p-2 rounded-full montserrat font-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {/* Right Image Section */}
      <div className=" w-full 2xl:w-1/2  2xl:h-screen">
        <img src={bg} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
