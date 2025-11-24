/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { X } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useGetCategoriesQuery, useUpdateCategoryMutation } from "../../../../Redux/feature/auth/authapi";

export default function EditCategoryModal({ category, onClose }) {
  const [form, setForm] = useState({
    name: category.name,
    description: category.description,
    logo: null, // store only the new file if selected
    logoPreview: category.logo, // existing URL preview
  });

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const { data: categoriesData = [], refetch } = useGetCategoriesQuery();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, logo: file, logoPreview: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);

      // Only append the file if a new file is selected
      if (form.logo instanceof File) {
        formData.append("logo", form.logo);
      }

      await updateCategory({ id: category.id, formData }).unwrap();
    refetch();
      toast.success("Category updated successfully!");
      setTimeout(() => {
        onClose();
      }, 1000);
  
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <Toaster position="top-center" />
      <div className="w-[420px] p-6 bg-white rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute p-1 bg-gray-200 rounded top-3 right-3"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-4 text-xl font-semibold">Edit Category</h2>

        <div className="space-y-3">
          {/* Name */}
          <input
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Category Name"
          />

          {/* Description */}
          <textarea
            className="w-full p-2 border rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Category Description"
          />

          {/* Logo Upload */}
          <div>
            <label className="font-semibold">Logo (Image)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1"
            />
            {form.logoPreview && (
              <img
                src={form.logoPreview}
                alt="Preview"
                className="object-cover w-20 h-20 mt-2 border rounded"
              />
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-2 text-white rounded bg-cyan-600 hover:bg-cyan-700"
          >
            {isLoading ? "Updating..." : "Update Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
