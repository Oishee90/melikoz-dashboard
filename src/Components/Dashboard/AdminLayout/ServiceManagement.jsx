import React, { useState } from "react";
import { Wrench, Zap, Plus } from "lucide-react";
import AddCategoryModal from "./Service/AddCategoryModal";
import AddLocationModal from "./Service/AddLocationModal";
import EditCategoryModal from "./Service/EditCategoryModal";
import EditLocationModal from "./Service/EditLocationModal";
import {
  useDeleteCategoryMutation,
  useDeleteLocationMutation,
  useGetCategoriesQuery,
  useGetLocationsQuery,
} from "../../../Redux/feature/auth/authapi";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function ServiceManagement() {
  const { data: categoriesData = [], refetch: categoryRefetch } =
    useGetCategoriesQuery();
  const { data: locationsData = [], refetch: locationRefetch } =
    useGetLocationsQuery();

  const categories = categoriesData;
  const locations = locationsData;

  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(null);
  const [openEditLocation, setOpenEditLocation] = useState(null);

  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteLocation] = useDeleteLocationMutation();

  // ---------------- Delete Category ----------------
  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(id).unwrap();
        categoryRefetch();
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete category.", "error");
      }
    }
  };

  // ---------------- Delete Location ----------------
  const handleDeleteLocation = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteLocation(id).unwrap();
        locationRefetch();
        Swal.fire("Deleted!", "Location has been deleted.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete location.", "error");
      }
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "wrench":
        return <Wrench className="w-6 h-6" />;
      case "zap":
        return <Zap className="w-6 h-6" />;
      default:
        return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <div className="roboto mt-9">
      <Toaster position="top-center" />
      <div className="mx-auto">
        {/* ---------------- Service Categories ---------------- */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Service Categories
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setOpenAddLocation(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded bg-[#1290D9] hover:bg-cyan-600"
              >
                <Plus className="w-4 h-4" />
                Add Location
              </button>

              <button
                onClick={() => setOpenAddCategory(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded bg-[#1290D9] hover:bg-cyan-600"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 text-white bg-orange-500 rounded-lg">
                    {category.logo ? (
                      <img className="w-6 h-6" src={category.logo} alt="" />
                    ) : (
                      <Wrench className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Description: {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpenEditCategory(category)}
                    className="px-4 py-2 text-sm font-medium text-white transition rounded bg-cyan-500 hover:bg-cyan-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Service Locations ---------------- */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Service Locations
          </h2>

          <div className="space-y-3">
            {locations.map((location) => (
              <div
                key={location.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Latitude: {location.latitude ?? "—"} • Longitude:{" "}
                    {location.longitude ?? "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpenEditLocation(location)}
                    className="px-4 py-2 text-sm text-white rounded bg-cyan-500 hover:bg-cyan-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(location.id)}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {openAddCategory && (
        <AddCategoryModal onClose={() => setOpenAddCategory(false)} />
      )}
      {openAddLocation && (
        <AddLocationModal onClose={() => setOpenAddLocation(false)} />
      )}
      {openEditCategory && (
        <EditCategoryModal
          category={openEditCategory}
          onClose={() => setOpenEditCategory(null)}
        />
      )}
      {openEditLocation && (
        <EditLocationModal
          location={openEditLocation}
          onClose={() => setOpenEditLocation(null)}
        />
      )}
    </div>
  );
}
