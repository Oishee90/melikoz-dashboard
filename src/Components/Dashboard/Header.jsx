import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-6 bg-[#009038] dark:bg-[#374151] text-[#020202] dark:text-white">
      {/* Title */}
      <div></div>

      {/* Profile Section */}
      <div className="flex justify-around items-center  gap-4">
        {/* <NavLink to="/notification">
          <div className="relative">
            <div className="rounded-full bg-gray-200 px-3 py-3">
              <IoMdNotificationsOutline className="text-xl" />
            </div>
            <div className="absolute rounded-full bg-green-400 px-2 py-1 text-[10px] top-[-7%] right-[-10%]">
              1
            </div>
          </div>{" "}
        </NavLink> */}

        <NavLink to="/profile">
          {" "}
          <div
            className="flex items-center space-x-9 cursor-pointer"
            // onClick={toggleDropdown}
          >
            <img
              src={
                "https://res.cloudinary.com/dhlgk023u/image/upload/v1738496016/9334243_puz7m4.jpg"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              {/* {isDropdownOpen ? (
                <FaChevronUp className="text-[#000000] dark:text-white w-[20px] h-[20px]" />
              ) : (
                <FaChevronDown className="text-[#000000] dark:text-white w-[20px] h-[20px]" />
              )} */}
              {/* <FaChevronDown className="text-[#000000] dark:text-white w-[20px] h-[20px]" /> */}
            </div>
          </div>
        </NavLink>

        {/* Dropdown Menu */}
        {/* {isDropdownOpen && (
            <div
              ref={dropdownRef} // Attach the ref to the dropdown menu
              className="absolute w-[300%]  right-0 mt-7 z-10 bg-white dark:bg-[#374151] shadow-md rounded-md overflow-hidden"
            >
              <SidebarMenu />
            </div>
          )} */}
      </div>
    </div>
  );
};

export default Header;
