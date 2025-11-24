import React, { useState, useMemo } from "react";
import PaymentPlan from "./Payment/PaymentPlan";
import ProvidersAwaitingPayout from "./Payment/ProvidersAwaitingPayout";
import { useGetCTransictionQuery } from "../../../Redux/feature/auth/authapi";

const Payment = () => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // RTK Query API call
  const { data: transactions, isLoading, isError } = useGetCTransictionQuery();

  // Sorting by created_at
  const sortedPayments = useMemo(() => {
    if (!transactions) return [];
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [transactions, sortOrder]);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = sortedPayments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching transactions!</p>;

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
              <th className="px-4 py-4">User </th>
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
                <td className="px-4 py-4">{item.id}</td>
                <td className="px-4 py-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">{item.user_name}</td>
                <td className="px-4 py-4">
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
                      color: "#fff",
                    }}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">{item.transaction_type}</td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400">
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

      {/* Extra Sections */}
      <PaymentPlan />
      <ProvidersAwaitingPayout />
    </div>
  );
};

export default Payment;
