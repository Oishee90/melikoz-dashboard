/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { X } from "lucide-react";
import { useAddLocationMutation, useGetLocationsQuery } from "../../../../Redux/feature/auth/authapi";
import toast, { Toaster } from "react-hot-toast";

export default function AddLocationModal({ onClose }) {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [addLocation, { isLoading }] = useAddLocationMutation();
const { data: locationsData = [], refetch } =
    useGetLocationsQuery();
  // Allow only float numbers (0-9 and one dot)
  const handleFloatInput = (value, setter) => {
    const regex = /^-?\d*\.?\d*$/; // only numbers + optional decimal
    if (regex.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = async () => {
    if (!name || !latitude || !longitude) {
      return toast.error("All fields are required!");
    }

    const payload = {
      name,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    try {
      await addLocation(payload).unwrap();
      refetch();
      toast.success("Location added successfully!");
      setTimeout(() => onClose(), 900);
    } catch (error) {
      console.log(error);
      if (error?.status === 400 && error?.data) {
        const msg =
          Object.values(error.data)[0]?.[0] || "Failed to add location!";
        return toast.error(msg);
      }
      toast.error("Failed to add location!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Toaster position="top-center" />
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add New Location</h2>
          <button onClick={onClose} className="text-xl">
            <X />
          </button>
        </div>

        <div className="space-y-4">
          {/* Location Name */}
          <div>
            <label className="text-sm font-medium">Location Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
          </div>

          {/* Latitude */}
          <div>
            <label className="text-sm font-medium">Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => handleFloatInput(e.target.value, setLatitude)}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="text-sm font-medium">Longitude</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => handleFloatInput(e.target.value, setLongitude)}
              className="w-full px-3 py-2 mt-1 border rounded"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-2 mt-6 text-white bg-[#1290D9] hover:bg-[#1075af]"
        >
          {isLoading ? "Saving..." : "Save Location"}
        </button>
      </div>
    </div>
  );
}
