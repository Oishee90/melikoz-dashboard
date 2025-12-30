import React, { useState, useMemo } from "react";
import PaymentPlan from "./Payment/PaymentPlan";
import ProvidersAwaitingPayout from "./Payment/ProvidersAwaitingPayout";
import { useGetCTransictionQuery } from "../../../Redux/feature/auth/authapi";

const Payment = () => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { data: transactions, isLoading, isError } = useGetCTransictionQuery();

  const sortedPayments = useMemo(() => {
    if (!transactions) return [];
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [transactions, sortOrder]);

  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = sortedPayments.slice(indexOfFirst, indexOfLast);

  if (isLoading) return <p className="text-xl text-center">Loading...</p>;
  if (isError)
    return (
      <p className="text-xl text-center text-red-500">
        Error fetching transactions!
      </p>
    );

  return (
    <div className="container p-6 mx-auto">
      {/* Header & Sort */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <h2 className="text-[36px] font-bold">Payment Records</h2>
        <select
          className="px-4 py-2 border border-[#303030] rounded-lg text-base focus:outline-none focus:border-blue-500"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1); // Reset page when sorting
          }}
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
              <th className="px-4 py-4">Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="text-lg font-normal border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4 font-medium">{item.id}</td>
                <td className="px-4 py-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">{item.user_name || "N/A"}</td>
                <td className="px-4 py-4 font-semibold">
                  ${parseFloat(item.amount).toFixed(2)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className="px-3 py-1 text-sm font-semibold text-white rounded-full"
                    style={{
                      backgroundColor:
                        item.status.toLowerCase() === "completed"
                          ? "#6EEFC5"
                          : item.status.toLowerCase() === "pending"
                          ? "#EECA00"
                          : "#F8322F",
                    }}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">{item.transaction_type || "N/A"}</td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-lg text-center text-gray-500"
                >
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* RESPONSIVE & PROFESSIONAL PAGINATION - ONLY THIS PART CHANGED */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-end gap-2 mt-8">
          {/* Previous */}
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

            {/* Middle Pages */}
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

          {/* Next */}
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

      {/* Extra Sections - Unchanged */}
      <PaymentPlan />
      <ProvidersAwaitingPayout />
    </div>
  );
};

export default Payment;
