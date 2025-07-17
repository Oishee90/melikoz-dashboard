import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-6 bg-white dark:bg-[#374151] text-[#020202] dark:text-white px-10 roboto">
      {/* Profile Section */}

      {/* Left Side: Title and Welcome Message */}
      <div>
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-[#1290D9]"> Admin Dashboard</span>
        </h1>
      </div>

      {/* Right Side: Feedback Button (Only for allowed roles, not superadmin) */}

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full ">
          <img
            src="https://res.cloudinary.com/dwycwft99/image/upload/v1746606936/Profile_Image_Placeholder_2_1_znuysa.png"
            alt="Feedback Icon"
            className="h-12 w-14"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
