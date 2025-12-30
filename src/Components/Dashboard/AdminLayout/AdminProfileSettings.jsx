import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  useGetProfileUpdateQuery,
  useUpdateAdminProfileMutation,
} from "../../../Redux/feature/auth/authapi";

const AdminProfileSettings = () => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const { data: userProfile, refetch } = useGetProfileUpdateQuery();
  const [updateProfile, { isLoading }] = useUpdateAdminProfileMutation();

  const formik = useFormik({
    enableReinitialize: true, // ⭐ important
    initialValues: {
      name: userProfile?.name || "",
      phone: userProfile?.phone || "",
      profile: null,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        // unchanged হলেও existing data যাবে
        formData.append("name", values.name);
        formData.append("phone", values.phone);

        if (values.profile) {
          formData.append("profile_picture", values.profile);
        }

        await updateProfile(formData).unwrap();
        refetch();

        toast.success("Profile Updated Successfully 🎉");
        resetForm();
        setPreviewUrl(null);
      } catch (error) {
        toast.error("Failed to update profile ❌");
      }
    },
  });

  // Image handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("profile", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    formik.setFieldValue("profile", null);
    setPreviewUrl(null);
  };

  return (
    <div className="container mx-auto bg-white">
      <h2 className="mb-4 text-[36px] font-bold roboto">
        Admin Profile Settings
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="border border-[#C1C1C1] rounded-lg p-8 w-1/2"
      >
        {/* Section Title */}
        <div className="flex items-center gap-2 mb-4 font-bold text-[#303030] roboto text-[24px]">
          <FaUser /> Personal Information
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1 text-lg font-bold text-[#303030]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Email (read-only) */}
        <div className="mb-4">
          <label className="block mb-1 text-lg font-bold text-[#303030]">
            Email Address
          </label>
          <input
            type="email"
            value={userProfile?.email || "admin@gmail.com"}
            disabled
            className="w-full px-3 py-2 bg-gray-300 border rounded-md"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 text-lg font-bold text-[#303030]">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block mb-1 text-lg font-bold text-[#303030]">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm border rounded-lg"
          />

          {/* Existing profile image */}
          {!previewUrl && userProfile?.profile_picture && (
            <img
              src={userProfile.profile_picture}
              alt="Current Profile"
              className="w-32 mt-4 border rounded"
            />
          )}

          {/* Preview image */}
          {previewUrl && (
            <div className="relative w-32 mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full border rounded"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute w-6 h-6 text-white bg-red-600 rounded-full -top-2 -right-2"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 mt-4 text-lg font-semibold text-white bg-indigo-800 rounded-md hover:bg-indigo-900 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfileSettings;
