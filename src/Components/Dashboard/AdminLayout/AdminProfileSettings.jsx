import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { toast } from "react-toastify";
import {
  useGetProfileUpdateQuery,
  useUpdateAdminProfileMutation,
} from "../../../Redux/feature/auth/authapi";

const AdminProfileSettings = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updateProfile, { isLoading }] = useUpdateAdminProfileMutation();
  const { data: userProfile, refetch } = useGetProfileUpdateQuery();
  console.log(userProfile, "userProfile");
  // Formik setup
  // initialValues
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      profile: null, // backend expects 'profile'
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required("Full Name is required"),
    //   phone: Yup.string().required("Phone Number is required"),
    // }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        if (values.profile) {
          formData.append("profile_picture", values.profile); // match backend
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
      formik.setFieldValue("profile", file); // <-- use 'profile'
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    formik.setFieldValue("profile", null); // <-- use 'profile'
    setPreviewUrl(null);
  };

  // Handle image preview

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
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder={userProfile?.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border border-[#777777] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Email Address
          </label>
          <input
            type="email"
            value="admin@gmail.com"
            className="w-full px-3 py-2 border bg-[#c7c2c2] placeholder:text-white border-[#777777] rounded-md"
            disabled
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder={userProfile?.phone}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border border-[#777777] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block mb-1 text-lg text-[#303030] font-bold">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm border rounded-lg border-[#777777] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-white file:bg-[#1290D9] hover:file:bg-indigo-100"
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
