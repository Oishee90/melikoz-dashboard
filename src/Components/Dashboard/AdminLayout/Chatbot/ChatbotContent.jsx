// File: ChatbotContent.tsx
import React, { useState } from "react";
import { TbXboxX } from "react-icons/tb";

import toast, { Toaster } from "react-hot-toast";
export default function ChatbotContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // FILE LIST SHOULD BE A STATE
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Terms And Condition.pdf",
      isNew: false,
      url: "https://example.com/files/terms.pdf",
    },
    {
      id: 2,
      name: "Privacy policy.pdf",
      isNew: false,
      url: "https://example.com/files/terms.pdf",
    },
    {
      id: 3,
      name: "Rules.pdf",
      isNew: true,
      url: "https://example.com/files/terms.pdf",
    },
    {
      id: 4,
      name: "New Rules.pdf",
      isNew: true,
      url: "https://example.com/files/terms.pdf",
    },
  ]);

  // Handle Drag
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  // Drop File
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files[0]) {
      const uploaded = e.dataTransfer.files[0];
      if (uploaded.size <= 10 * 1024 * 1024) setFile(uploaded);
      else alert("Max limit is 10MB");
    }
  };

  // Input File Change
  const handleChange = (e) => {
    if (e.target.files[0]) {
      const uploaded = e.target.files[0];
      if (uploaded.size <= 10 * 1024 * 1024) setFile(uploaded);
      else alert("Max limit is 10MB");
    }
  };

  // Remove file preview
  const removeFile = () => {
    setFile(null);
    const input = document.getElementById("file-input");
    if (input) input.value = "";
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fileName.trim()) return toast.error("Please enter a file name");
    if (!file) return toast.error("Please upload a file");

    const newFile = {
      id: files.length + 1,
      name: fileName.trim(),
      isNew: true,
    };

    // Update file list
    setFiles([newFile, ...files]);

    toast.success("File uploaded successfully!");

    setFile(null);
    setFileName("");
    setIsModalOpen(false);

    // Remove NEW badge after 5 sec
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.id === newFile.id ? { ...f, isNew: false } : f))
      );
    }, 5000);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <Toaster position="top-right" />
      <div className="mx-auto ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#303030] robot">
            Chatbot Content
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 font-medium text-white transition   bg-[#1290D9] rounded-lg shadow-sm hover:bg-[#07679e] roboto"
          >
            + Upload Content
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white border border-[#C1C1C1] shadow-sm rounded-xl roboto m">
          <table className="w-full">
            <thead className="bg-white border-b border-[#C1C1C1]">
              <tr>
                <th className="px-6 py-4 text-base font-semibold text-left text-[#303030]">
                  #SL
                </th>
                <th className="px-6 py-4 text-base font-semibold text-left text-[#303030]">
                  Name
                </th>

                <th className="px-6 py-4 pr-10 text-base  font-semibold text-center  text-[#303030]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  className="transition border-b border-[#C1C1C1] hover:bg-gray-50 last:border-0"
                >
                  <td className="px-6 py-5 text-[#303030]">{file.id}</td>
                  <td className="flex items-center gap-2 px-6 py-5 text-[#303030]">
                    {file.name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <a
                      href={file?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="px-4 py-2 mr-2 text-sm font-medium text-white transition rounded-md bg-[#006745] hover:bg-emerald-900">
                        View File
                      </button>
                    </a>
                    <button className="px-4 py-2 text-sm font-medium text-white transition bg-[#FE272C] rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white shadow-xl rounded-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-xl font-semibold">
                Upload New Chatbot Content
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <TbXboxX className="w-7 h-7" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* File Name */}
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Enter file name"
                  />
                </div>

                {/* File Upload */}
                <div className="mb-8">
                  <label className="block mb-2 text-sm font-semibold">
                    Upload File
                  </label>

                  {file ? (
                    <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="flex items-center space-x-3">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button type="button" onClick={removeFile}>
                        <TbXboxX className="w-6 h-6 text-red-600" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                        dragActive
                          ? "border-[#1290D9] bg-blue-50"
                          : "border-gray-300 bg-gray-50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="file-input"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <p className="text-sm text-gray-600">
                        <span className="text-[#1290D9] font-medium cursor-pointer">
                          Click to upload
                        </span>{" "}
                        or drag & drop
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        PDF, DOC, DOCX (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!file}
                  className={`w-full py-3 text-white rounded-lg ${
                    file
                      ? "bg-[#1290D9] hover:bg-[#07679e]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
