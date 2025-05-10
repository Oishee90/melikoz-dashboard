import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaApple } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bg from "../../assets/verify.png";
import logo from "../../assets/logo.png";

import { FcGoogle } from "react-icons/fc";

const Forgot = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="flex lg:flex-row flex-col justify-between items-center h-full 2xl:h-screen ">
      {/* Left Form Section */}
      <div className=" w-full 2xl:w-1/2 flex flex-col justify-center p-4  md:p-8 bg-white h-full poppins ">
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className=" mt-4 mb-4" />
        </div>
        <div className="md:px-12 px-4">
          <h2 className="text-2xl poppins lg:text-[38px] font-medium mt-6 mb-12 text-left text-[#333333]">
            Verify
          </h2>

          <div></div>
          <form
            // onSubmit={handleSubmit}
            className="w-full space-y-3 mt-6  justify-center items-center"
          >
            <div className="flex flex-col  mb-7 ">
              <label
                htmlFor="email"
                className="poppins mb-2 font-medium text-base"
              >
                Email
              </label>
              <input
                type="name"
                name="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-[#1D1D1D59]  bg-transparent  poppins placeholder:text-[#00000080] rounded-xl mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="px-12 bg-[#009038] text-[#000000] p-2 rounded-full poppins font-bold"
            >
              Get Otp
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

export default Forgot;
