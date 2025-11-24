/* eslint-disable react/prop-types */
import React from "react";

export default function EditPlanModal({ open, onClose, plan }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Membership Cost</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Plan Name (Read Only) */}
          <div>
            <label className="block mb-1 text-sm font-medium">Plan Name</label>
            <input
              type="text"
              value={plan?.name}
              readOnly
              className="w-full px-3 py-2 text-sm bg-gray-100 border rounded-lg cursor-not-allowed"
            />
          </div>

          {/* Price Editable */}
          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="text"
              defaultValue={plan?.price}
              className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Features (Read Only) */}
          <div>
            <label className="block mb-1 text-sm font-medium">Features</label>
            <textarea
              rows="4"
              value={plan?.features.join("\n")}
              readOnly
              className="w-full px-3 py-2 text-sm bg-gray-100 border rounded-lg cursor-not-allowed"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
