/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../Redux/feature/auth/authapi";
import toast, { Toaster } from "react-hot-toast";
export default function AddCategoryModal({ onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);

  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const { data: categoriesData = [], refetch } = useGetCategoriesQuery();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("logo", logo);

    try {
      const result = await addCategory(formData).unwrap();
      refetch();
      toast.success("Category added successfully!"); // SUCCESS

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.log("Error:", error);

      // ---- 400 ERROR HANDLE ----
      if (error?.status === 400) {
        const msg =
          error?.data?.name?.[0] || error?.data?.message || "Invalid input!";

        toast.error(msg); // response থেকে message show
        return;
      }

      // ---- OTHER ERRORS ----
      toast.error("Failed to add category!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 roboto">
      <Toaster />
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add New Category</h2>
          <button onClick={onClose} className="text-xl">
            <X />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded"
            ></textarea>
          </div>

          {/* Logo */}
          <div>
            <label className="text-sm font-medium">Logo</label>
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-2 mt-6 text-white bg-[#1290D9] hover:bg-[#1075af]"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
