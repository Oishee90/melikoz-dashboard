/* eslint-disable react-hooks/rules-of-hooks */
import { RxCross1 } from "react-icons/rx";
import profile from "../../../assets/image-profile.png";
import { useState } from "react";
const UserDetails = ({ isOpen, onClose, user, index, handleStatusChange }) => {
  if (!isOpen) return null;
  const [status, setStatus] = useState(user?.status || "Expired");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg relative w-full max-w-3xl h-[650px] border border-[#fafafa]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 font-extrabold text-white bg-[#10589E] p-2 rounded-3xl cursor-pointer"
        >
          <RxCross1 />
        </button>

        <div className="p-4">
          {/* Image Section */}
          <div className="w-full mx-auto py-10 flex items-center justify-center">
            <img src={profile} className="w-28 h-28 rounded-full mr-2" alt="" />
          </div>

          {/* Content Section */}
          <div className="w-3/4 mx-auto">
            <div className="relative mt-3 mb-6">
              <label className="block text-[14px] 2xl:text-base font-medium poppins text-[#000000] bg-white absolute top-[-22%] left-[7%] leading-[24px]">
                User Name
              </label>
              <input
                type="text"
                className="p-3 rounded-xl border border-black w-full py-4"
                defaultValue={user?.name} // Access the name directly
                disabled
              />
            </div>

            <div className="relative mt-3 mb-6">
              <label className="block text-[14px] 2xl:text-base font-medium poppins text-[#000000] bg-white absolute top-[-22%] left-[7%] leading-[24px]">
                User Email
              </label>
              <input
                type="text"
                className="p-3 rounded-xl border border-black w-full py-4"
                defaultValue={user?.email} // Access the email directly
                disabled
              />
            </div>

            <div className="mt-3 flex lg:flex-row flex-col items-center gap-8 w-full">
              <div className="relative mt-3 mb-6">
                <label className="block text-[10px] 2xl:text-[14px] font-medium poppins text-[#000000] bg-white absolute top-[-17%] left-[7%] leading-[24px]">
                  Total Followers
                </label>
                <input
                  type="text"
                  className="p-3 rounded-xl border border-black w-full py-4"
                  defaultValue={formatDate(user?.followers)} // Adjust this field based on the available data
                  disabled
                />
              </div>
              <div className="relative mt-3 mb-6">
                <label className="block text-[10px] 2xl:text-[14px] font-medium poppins text-[#000000] bg-white absolute top-[-17%] left-[7%] leading-[24px]">
                  Total Following
                </label>
                <input
                  type="text"
                  className="p-3 rounded-xl border border-black w-full py-4"
                  defaultValue={formatDate(user?.following)} // Adjust this field based on the available data
                  disabled
                />
              </div>
            </div>
            {/*
             */}
            <div className="relative mt-3 mb-6">
              <label className="block text-[10px] 2xl:text-[14px] font-medium poppins text-[#000000] bg-white absolute top-[-17%] left-[7%] leading-[24px]">
                Join Date
              </label>
              <input
                type="text"
                className="p-3 rounded-xl border border-black w-full py-4"
                defaultValue={formatDate(user?.joinDate)} // Adjust this field based on the available data
                disabled
              />
            </div>

            <div className="mt-6 flex items-center gap-4 mb-10">
              <h1 className="poppins font-medium text-[14px]">Status: </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setStatus("Active");
                    handleStatusChange(user._id, "Active");
                  }}
                  className={`px-6 py-2 rounded-full border-2 font-semibold ${
                    status === "Active"
                      ? "border-green-600 text-green-600 bg-white"
                      : "border-gray-300 text-gray-500 bg-gray-100"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => {
                    setStatus("Suspend");
                    handleStatusChange(user._id, "Suspend");
                  }}
                  className={`px-6 py-2 rounded-full font-semibold ${
                    status === "Suspend"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  Suspend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
