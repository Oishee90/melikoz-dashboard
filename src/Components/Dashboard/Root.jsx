import { Outlet } from "react-router-dom";

import AdminSidebar from "./Sidebar/AdminSidebar";

import MainHeader from "./MainHeader";
import Header from "./Header";

const Root = () => {
  return (
    <div className="flex h-screen bg-white dark:bg-[#1F2937]">
      {/* Sidebar - Fixed Position */}
      <div className="w-[280px] fixed left-0 top-0 h-screen">
        <AdminSidebar></AdminSidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[280px]">
        {/* Header */}
        <Header></Header>

        {/* Dynamically Render Child Components */}
        <main className="flex-1 bg-white dark:bg-[#1F2937] p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
