import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaApple } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../../assets/set.png";
import logo from "../../assets/logo.png";

import { FcGoogle } from "react-icons/fc";

const Setnew = () => {
  const [email, setEmail] = useState("");

  //   const [login] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showconfirmPassword, setConfirmShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglenewPasswordVisibility = () => {
    setConfirmShowPassword((prev) => !prev);
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between items-center h-full 2xl:h-screen ">
      {/* Left Form Section */}
      <div className=" w-full 2xl:w-1/2 flex flex-col justify-center p-4  md:p-8 bg-white h-full poppins ">
        <div className="flex justify-center items-center mb-9">
          <img src={logo} alt="Logo" className=" mt-4 mb-4" />
        </div>
        <div className="md:px-12 px-4">
          <h2 className="text-2xl poppins lg:text-[38px] font-medium mt-6  text-left text-[#333333] mb-9">
            Reset
          </h2>

          <div></div>
          <form
            // onSubmit={handleSubmit}
            className="w-full space-y-3 mt-6  justify-center items-center"
          >
            <div className="flex flex-col mt-6 mb-9">
              <label className="poppins mb-3 font-normal text-base flex justify-between items-center">
                New Password
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="flex items-center gap-1 text-base font-normal text-black"
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

            <div className="flex flex-col mt-6 mb-9">
              <label className="poppins mb-3 font-normal  text-base flex justify-between items-center">
                Confirm Password
                <button
                  type="button"
                  onClick={togglenewPasswordVisibility}
                  className="flex items-center gap-1 text-base font-normal text-black"
                >
                  {showconfirmPassword ? (
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
                type={showconfirmPassword ? "text" : "password"}
                name="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 border border-[#1D1D1D59] bg-transparent montserrat placeholder:text-[#00000080] rounded-xl"
                required
              />
            </div>

            <button
              type="submit"
              className="px-12 !mt-9 bg-[#009038] text-[#000000] p-2 rounded-full montserrat font-bold"
            >
              Reset
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

export default Setnew;
