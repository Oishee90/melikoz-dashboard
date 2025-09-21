import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import { use } from "react";
import { useGetAIfeedbackQuery } from "../../../Redux/feature/auth/authapi";

// Updated Feedback Data
const fakeFeedback = [
  {
    id: "FBK001",
    date: "2025-07-01",
    type: "Service Quality",
    urgency: 8.5,
    summary: "Client was highly satisfied with timely response and clarity.",
  },
  {
    id: "FBK002",
    date: "2025-07-03",
    type: "Delays",
    urgency: 6.0,
    summary: "Minor delay reported in document processing.",
  },
  {
    id: "FBK003",
    date: "2025-07-05",
    type: "Communication",
    urgency: 9.2,
    summary: "Client noted poor responsiveness from the provider.",
  },
  {
    id: "FBK004",
    date: "2025-07-10",
    type: "Technical Issue",
    urgency: 4.3,
    summary: "A form submission error was quickly resolved.",
  },
  {
    id: "FBK005",
    date: "2025-07-12",
    type: "Positive Review",
    urgency: 2.1,
    summary: "Client left excellent remarks about the agent’s behavior.",
  },
];

const AI = () => {
  // const [feedback, setFeedback] = useState(fakeFeedback);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { data: feedback = [] } = useGetAIfeedbackQuery();
  const filteredFeedback = feedback.filter((f) =>
    f?.id?.toString().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredFeedback.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);

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
              <th className="px-4 py-4">Type</th>
              <th className="px-4 py-4">Urgency Score</th>
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
                <td className="px-4 py-4">{item.booking_type || "N/A"}</td>
                <td className="px-4 py-4 text-[#F8322F]">
                  {item.urgency || "N/A"}
                </td>
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

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num + 1)}
            className={`px-3 py-1 rounded border text-sm ${
              currentPage === num + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AI;
