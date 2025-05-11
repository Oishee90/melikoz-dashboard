import React, { useState } from "react";
import bg from "../../assets/otp.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { div } from "framer-motion/client";
import Setnew from "./Setnew";
const Verification = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const navigate = useNavigate();
  const [newpass, setNew] = useState("");
  // Handle input change
  const handleInputChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`input-${index + 1}`).focus(); // Focus next input
    }
  };

  // Handle keydown for navigating between inputs
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      document.getElementById(`input-${index - 1}`).focus(); // Focus previous input
    }
  };

  // Handle paste event (only numeric values are allowed)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").split("");
    if (
      pastedData.length === 4 &&
      pastedData.every((char) => /^\d$/.test(char))
    ) {
      setCode(pastedData);
    }
  };

  // Handle submit (Verification logic)
  const handleSubmit = () => {
    const otpCode = code.join(""); // Convert array to string
    if (otpCode.length === 4) {
      setSuccessMessage("✅ Verification Successful! Redirecting...");
      setTimeout(() => {
        setSuccessMessage(""); // Clear message after a few seconds
      }, 3000);
      setNew(true);
    } else {
      setSuccessMessage("❌ Please enter a valid 4-digit code.");
      setNew(false);
    }
  };

  return (
    <div>
           {!newpass? (
 
    <div className="flex 2xl:flex-row flex-col justify-between items-center h-full 2xl:h-screen">
      {/* Left Form Section */}
      <div className="w-full 2xl:w-1/2 flex flex-col  p-8  h-full montserrat">
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="mb-4" />
        </div>
        <div className="px-14 mt-32">
          <h2 className="text-2xl lg:text-[38px] font-bold mt-6 mb-9">OTP</h2>

          {/* OTP Input Fields */}
          <div className="flex  space-x-3 mb-4 mt-6" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-[#009038] bg-[#E2E9E3] rounded-xl text-center text-lg placeholder:text-[#313131] focus:outline-none focus:ring-2 focus:ring-[#104123]"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            className="px-14  py-2 bg-[#009038] text-[#000000] font-semibold rounded-full hover:opacity-90 transition h-[51px] mt-7"
          >
            VERIFY
          </button>

          {/* Success/Error Message */}
          {successMessage && (
            <p className="mt-4 text-lg font-semibold">{successMessage}</p>
          )}
        </div>
      </div>
      {/* Right Image Section */}
      <div className="relative w-full 2xl:w-1/2 2xl:h-screen h-[100vh]">
        {/* Image */}
        <img src={bg} alt="Background" className="w-full h-full object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#69696980] to-[#07070780]"></div>
      </div>
    </div>
     ) : (
      // Show Verification Section
   <Setnew></Setnew>
    )}
       </div>
  );
};

export default Verification;
