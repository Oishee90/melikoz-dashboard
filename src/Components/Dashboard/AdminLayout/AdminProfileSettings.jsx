import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
const AdminProfileSettings = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a successful save
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile information has been successfully saved!",
      confirmButtonColor: "#4F46E5", // Indigo
    });

    // You can also reset state or send to API here
  };

  return (
    <div className="container mx-auto bg-white ">
      <h2 className="mb-4 text-[36px] font-bold roboto">
        Admin Profile Settings
      </h2>

      <form
        onSubmit={handleSubmit}
        className="border border-[#C1C1C1] rounded-lg p-8 w-1/2
      "
      >
        <div className="flex items-center gap-2 mb-4 font-bold text-[#303030] roboto text-[24px]">
          <span>
            <FaUser />
          </span>{" "}
          Personal Information
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Admin Name"
            className="w-full px-3 py-2 border  border-[#777777] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Email Address
          </label>
          <input
            type="email"
            placeholder="admin@gmail.com"
            className="w-full px-3 py-2 border bg-[#c7c2c2] placeholder:text-white  border-[#777777] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="+880xxxxxxxxxx"
            className="w-full px-3 py-2 border   border-[#777777] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Language
          </label>
          <select className="w-full px-3 py-2 border   border-[#777777] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm  border  rounded-lg border-[#777777]   text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-white  file:bg-[#1290D9] hover:file:bg-indigo-100"
          />

          {previewUrl && (
            <div className="relative w-48 mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full border rounded"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute flex items-center justify-center w-6 h-6 font-bold text-white bg-red-600 rounded-full -top-2 -right-2 hover:bg-red-700"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-lg font-semibold text-white bg-indigo-800 rounded-md hover:bg-indigo-900"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminProfileSettings;
