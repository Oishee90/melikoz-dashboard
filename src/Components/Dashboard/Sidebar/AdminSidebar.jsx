import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { VscTools } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
import logo from "../../../assets/melikozlogo.png";
import { CiLogin } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeetingsDropdownOpen, setSeetingsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
  const dropdownRef = useRef(null);

  const isActiveDashboard = location.pathname === "/";
  const isActiveUsers = location.pathname === "/users";
  const isActiveServices = location.pathname === "/services";
  const isActiveAI = location.pathname === "/aioversight";
  const isActivePayment = location.pathname === "/payment";
  const isActiveSystem = location.pathname === "/system";
  const isActiveSettings = location.pathname === "/settings";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    navigate("/login", { replace: true }); // Redirect to login page
  };
  const toggleDropdownSettings = () => setSeetingsDropdownOpen((prev) => !prev);
  return (
    <div className="bg-[#1290D9]  border-r-2  border-r-[#1290D9]  min-h-screen flex flex-col justify-between  open-sns">
      {/* Logo Section */}
      <div className="flex flex-col py-4">
        <div className="flex items-center justify-center px-6 pb-4">
          <img src={logo} alt="Logo" />
        </div>
        {/* Menu Items */}
        <nav className="flex flex-col  text-[#364636]">
          <NavLink
            to="/"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 pt-15">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveDashboard
                      ? "bg-[#312E81] text-white rounded-xl"
                      : "text-white"
                  }`}
              >
                <MdOutlineDashboard className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="text-base font-semibold poppins">Dashboard</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="users"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 pt-15">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveUsers
                      ? "bg-[#312E81] text-white rounded-xl"
                      : "text-white"
                  }`}
              >
                <FaUserAlt className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="text-base font-semibold poppins">User</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="services"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 pt-15">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveServices
                      ? "bg-[#312E81] text-white rounded-xl"
                      : "text-white"
                  }`}
              >
                <VscTools className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="text-base font-semibold poppins">Service</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="aioversight"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 pt-15">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveAI
                      ? "bg-[#312E81] text-white rounded-xl"
                      : "text-white"
                  }`}
              >
                <HiOutlineShieldCheck className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="text-base font-semibold poppins">
                  Al Oversight
                </h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="payment"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 pt-15">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActivePayment
                      ? "bg-[#312E81] text-white rounded-xl"
                      : "text-white"
                  }`}
              >
                <MdOutlinePayments className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="text-base font-semibold poppins">Payment</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="system"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 pt-15">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveSystem
                      ? "bg-[#312E81] text-white rounded-xl"
                      : "text-white"
                  }`}
              >
                <CiLogin className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="text-base font-semibold poppins">System</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="settings"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 pt-15">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveSettings
                      ? "bg-[#312E81] text-white rounded-xl"
                      : "text-white"
                  }`}
              >
                <IoMdSettings className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="text-base font-semibold poppins">Settings</h1>
              </div>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center p-2 pb-10 pl-10 space-x-3 text-white rounded-lg cursor-pointer"
      >
        <FaSignOutAlt />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
