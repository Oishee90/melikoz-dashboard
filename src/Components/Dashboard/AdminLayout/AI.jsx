import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import { useGetAIfeedbackQuery } from "../../../Redux/feature/auth/authapi";

const AI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { data: feedback = [] } = useGetAIfeedbackQuery();

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredFeedback = feedback.filter((f) =>
    f?.id?.toString().toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredFeedback.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container p-6 mx-auto">
      {/* Search */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-[36px] font-bold">Feedback Monitoring</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Feedback ID..."
            className="px-3 py-1 pl-8 border border-[#303030] rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-[#C1C1C1]">
        <table className="min-w-full table-auto roboto">
          <thead>
            <tr className="text-left font-medium text-xl text-[#303030] border-b border-b-[#C1C1C1]">
              <th className="px-4 py-4">Feedback ID</th>
              <th className="px-4 py-4">Date</th>
              {/* <th className="px-4 py-4">Type</th> */}
              <th className="px-4 py-4">Summary</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="text-lg font-normal border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4">{item.id || "N/A"}</td>
                <td className="px-4 py-4">{item.date || "N/A"}</td>
                {/* <td className="px-4 py-4">{item.booking_type || "N/A"}</td> */}
                <td className="px-4 py-4">{item.description || "N/A"}</td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-400">
                  No feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* RESPONSIVE & CLEAN PAGINATION - ONLY THIS PART IS CHANGED */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-end gap-2 mt-6">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 1
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              1
            </button>

            {/* Left Ellipsis */}
            {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}

            {/* Middle Pages (current ±1) */}
            {(() => {
              const pages = [];
              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);

              for (let i = start; i <= end; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                      currentPage === i
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 text-gray-700"
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              return pages;
            })()}

            {/* Right Ellipsis */}
            {currentPage < totalPages - 3 && (
              <span className="px-2 text-gray-500">...</span>
            )}

            {/* Last Page */}
            {totalPages > 1 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AI;
