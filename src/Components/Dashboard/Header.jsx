import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useGetProfileUpdateQuery } from "../../Redux/feature/auth/authapi";
import { use } from "react";

const Header = () => {
  const { data: userProfile, refetch } = useGetProfileUpdateQuery();
  return (
    <div className="flex items-center justify-between py-6 bg-white  text-[#020202] px-10 roboto">
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
            src={userProfile?.profile?.profile_picture}
            alt="Feedback Icon"
            className="h-14 w-14"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
