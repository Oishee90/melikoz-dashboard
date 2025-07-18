import React, { useState } from "react";

// Payment Data
const fakePayments = [
  {
    transactionId: "TXN1001",
    date: "2025-07-12",
    user: "Alice Johnson",
    amount: 250.75,
    status: "Completed",
    method: "Credit Card",
  },
  {
    transactionId: "TXN1002",
    date: "2025-07-10",
    user: "Bob Smith",
    amount: 120.0,
    status: "Pending",
    method: "Bank Transfer",
  },
  {
    transactionId: "TXN1003",
    date: "2025-07-08",
    user: "Carol Lee",
    amount: 89.99,
    status: "Failed",
    method: "PayPal",
  },
  {
    transactionId: "TXN1004",
    date: "2025-07-05",
    user: "David Kim",
    amount: 310.5,
    status: "Completed",
    method: "Credit Card",
  },
  {
    transactionId: "TXN1005",
    date: "2025-07-02",
    user: "Eve Turner",
    amount: 150.0,
    status: "Completed",
    method: "Bank Transfer",
  },
];

const Payment = () => {
  const [payments, setPayments] = useState(fakePayments);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const sortedPayments = [...payments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = sortedPayments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);

  return (
    <div className="container p-6 mx-auto">
      {/* Header & Sort */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-[36px] font-bold">Payment Records</h2>
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
              <th className="px-4 py-4">Transaction ID</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">User</th>
              <th className="px-4 py-4">Amount ($)</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.transactionId}
                className="text-lg font-normal border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4">{item.transactionId}</td>
                <td className="px-4 py-4">{item.date}</td>
                <td className="px-4 py-4">{item.user}</td>
                <td className="px-4 py-4">${item.amount.toFixed(2)}</td>
                <td className="px-4 py-4">{item.status}</td>
                <td className="px-4 py-4">{item.method}</td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-400">
                  No payment records found.
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

export default Payment;
