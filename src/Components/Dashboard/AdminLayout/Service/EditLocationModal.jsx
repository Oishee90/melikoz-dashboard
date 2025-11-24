/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { X } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import {
  useGetLocationsQuery,
  useUpdateLocationMutation,
} from "../../../../Redux/feature/auth/authapi";

export default function EditLocationModal({ location, onClose }) {
  const [form, setForm] = useState({
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
  });

  const [updateLocation, { isLoading }] = useUpdateLocationMutation();
  const { data: locationsData = [], refetch } = useGetLocationsQuery();
  const handleSubmit = async () => {
    try {
      await updateLocation({ id: location.id, data: form }).unwrap();

      toast.success("Location updated successfully!");
      refetch();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update location!");
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

        <h2 className="mb-4 text-xl font-semibold">Edit Location</h2>

        <div className="space-y-3">
          {/* Name */}
          <input
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Location Name"
          />

          {/* Latitude */}
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={form.latitude}
            onChange={(e) =>
              setForm({ ...form, latitude: parseFloat(e.target.value) })
            }
            placeholder="Latitude"
          />

          {/* Longitude */}
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={form.longitude}
            onChange={(e) =>
              setForm({ ...form, longitude: parseFloat(e.target.value) })
            }
            placeholder="Longitude"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-2 text-white rounded bg-cyan-600 hover:bg-cyan-700"
          >
            {isLoading ? "Updating..." : "Update Location"}
          </button>
        </div>
      </div>
    </div>
  );
}
