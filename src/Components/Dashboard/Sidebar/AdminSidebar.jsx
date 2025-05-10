import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { MdElectricBolt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { PiShoppingBagOpen } from "react-icons/pi";
import { TbCalendarQuestion } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { SlHome } from "react-icons/sl";
import logo from "../../../assets/dashboard-logo.png";

const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeetingsDropdownOpen, setSeetingsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
  const dropdownRef = useRef(null);

  const isActiveDashboard = location.pathname === "/";

  const isActiveSettings =
    location.pathname.startsWith("/terms") ||
    location.pathname.startsWith("/privacy");

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
    <div className="bg-[#009038]  border-r-2  border-r-[#009038]  min-h-screen flex flex-col justify-between  open-sns">
      {/* Logo Section */}
      <div className="flex flex-col  py-4">
        <div className="flex px-6 items-center justify-center  pb-4">
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
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveDashboard
                      ? "bg-white text-[#282828] rounded-xl"
                      : "text-white"
                  }`}
              >
                <SlHome className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins font-semibold   text-base">Home</h1>
              </div>
            </div>
          </NavLink>

          <div className="flex items-center justify-between w-[280px] font-semibold cursor-pointer p-2 pt-15">
            {/* Main Button Area */}
            <div
              onClick={toggleDropdownSettings}
              className={`flex  relative items-center space-x-2 justify-start w-[250px] h-[50px] p-5  gap-2
                    ${
                      isActiveSettings
                        ? "bg-white text-[#282828] rounded-xl"
                        : "text-white"
                    }`}
            >
              <IoSettingsOutline className="w-[18px] h-[18px] " />
              <h1 className="text-[16px] font-[500] whitespace-nowrap">
                Settings
              </h1>
              {isSeetingsDropdownOpen ? (
                <FaChevronUp
                  className={` dark:text-white w-[20px] h-[15px]   ${
                    isActiveSettings ? " text-[#348b28]" : "text-white"
                  } `}
                />
              ) : (
                <FaChevronDown
                  className={` dark:text-white w-[20px] h-[15px]   ${
                    isActiveSettings ? "text-[#348b28]" : "text-white"
                  } `}
                />
              )}
              {isSeetingsDropdownOpen && (
                <ul className="absolute left-[-3%] top-[94%]  mt-1 w-full bg-[#FAF1E6] border border-gray-300 shadow-lg z-10 text-center rounded-xl">
                  {/* <li>
                    <NavLink
                      to="/profile"
                      className={({ isActiveo }) =>
                        `block py-2 text-gray-700 ${
                          isActiveo
                            ? "bg-[#CBD9CC] "
                            : "hover:bg-[#8CAB91] bg-white text-black hover:text-[#FAF1E6]"
                        }`
                      }
                    >
                      Profile
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      to="/privacy"
                      className={({ isActive }) =>
                        `block py-2 text-gray-700  ${
                          isActive
                            ? "bg-[#72BE20] text-white "
                            : "hover:bg-[#9bc273] bg-white text-black hover:text-[#FAF1E6]"
                        }`
                      }
                    >
                      Privacy And Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/terms"
                      className={({ isActive }) =>
                        `block py-2 text-gray-700 ${
                          isActive
                            ? "bg-[#72BE20] text-white "
                            : "hover:bg-[#9bc273] bg-white text-black hover:text-[#FAF1E6]"
                        }`
                      }
                    >
                      Terms And Condition
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center space-x-3 p-2 text-white cursor-pointer rounded-lg pb-10 pl-10"
      >
        <FaSignOutAlt />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
