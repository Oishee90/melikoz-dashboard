import React, { useState } from "react";
import Swal from "sweetalert2";

// Updated System Log Data
const fakeLogs = [
  {
    timestamp: "2025-07-12 14:30",
    user: "Alice Johnson",
    action: "Login",
    details: "User logged into the system.",
    ip: "192.168.1.101",
  },
  {
    timestamp: "2025-07-10 09:15",
    user: "Bob Smith",
    action: "Delete",
    details: "Deleted customer record #45321.",
    ip: "192.168.1.102",
  },
  {
    timestamp: "2025-07-05 17:45",
    user: "Carol Lee",
    action: "Update",
    details: "Updated billing address for user #9021.",
    ip: "192.168.1.103",
  },
  {
    timestamp: "2025-07-01 08:05",
    user: "David Kim",
    action: "Logout",
    details: "User logged out of the system.",
    ip: "192.168.1.104",
  },
  {
    timestamp: "2025-07-03 12:00",
    user: "Eve Turner",
    action: "Create",
    details: "Created new support ticket #88991.",
    ip: "192.168.1.105",
  },
];

const SystemLog = () => {
  const [logs, setLogs] = useState(fakeLogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const itemsPerPage = 4;

  const sortedLogs = [...logs].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = sortedLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);

  const handleDelete = (timestamp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This log entry will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLogs(logs.filter((log) => log.timestamp !== timestamp));
        Swal.fire("Deleted!", "Log entry has been removed.", "success");
      }
    });
  };

  return (
    <div className="container p-6 mx-auto">
      {/* Header & Sort */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-[36px] font-bold">System Logs</h2>
        <select
          className="px-3 py-2 border border-[#303030] rounded-lg"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Sort by: Newest First</option>
          <option value="oldest">Sort by: Oldest First</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-[#C1C1C1]">
        <table className="min-w-full table-auto roboto">
          <thead>
            <tr className="text-left font-medium text-xl text-[#303030] border-b border-b-[#C1C1C1]">
              <th className="px-4 py-4">Timestamp</th>
              <th className="px-4 py-4">User</th>
              <th className="px-4 py-4">Action</th>
              <th className="px-4 py-4">Details</th>
              <th className="px-4 py-4">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((log) => (
              <tr
                key={log.timestamp}
                className="text-lg font-normal border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4">{log.timestamp}</td>
                <td className="px-4 py-4">{log.user}</td>
                <td className="px-4 py-4">{log.action}</td>
                <td className="px-4 py-4">{log.details}</td>
                <td className="px-4 py-4">{log.ip}</td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400">
                  No logs available.
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

export default SystemLog;
