/* eslint-disable react/prop-types */
import React from "react";

const FileViewModal = ({ file, onClose }) => {
  if (!file) return null;

  const isImage = file.type.includes("image");
  const isPDF = file.type.includes("pdf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[500px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-xl font-bold right-3 top-3"
        >
          ✖
        </button>

        {/* Document Type */}
        <h2 className="mb-4 text-xl font-semibold">
          Document Type: {file.document_type || "N/A"}
        </h2>

        {/* Image Preview */}
        {isImage && (
          <img
            src={file.url}
            alt="uploaded"
            className="w-full rounded-md shadow"
          />
        )}

        {/* PDF */}
        {isPDF && (
          <div className="text-center mt-9">
            <a
              href={file.url}
              target="_blank"
              className="px-4 py-2 text-white bg-[#1290D9] rounded-md"
            >
              Open PDF
            </a>
          </div>
        )}

        {/* Other files */}
        {!isImage && !isPDF && (
          <div className="text-center">
            <a
              href={file.url}
              download
              className="px-4 py-2 text-white bg-gray-700 rounded-md"
            >
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewModal;
