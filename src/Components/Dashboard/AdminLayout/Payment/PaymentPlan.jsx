import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetPayoutQuery } from "../../../../Redux/feature/auth/authapi";

const PaymentPlan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: allMembers = [], isLoading, isError } = useGetPayoutQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch data</p>;

  // Pagination
  const totalPages = Math.ceil(allMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = allMembers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className="roboto">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Payment Membership plan
          </h1>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-[#C1C1C1]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left font-medium text-xl text-[#303030] border-b border-b-[#C1C1C1]">
                  <th className="px-6 py-4 text-base font-bold">User</th>
                  <th className="px-6 py-4 text-base font-bold">Membership</th>
                  <th className="px-6 py-4 text-base font-bold">Amount</th>
                  <th className="px-6 py-4 text-base font-bold">Status</th>
                </tr>
              </thead>

              <tbody>
                {currentMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors border-b border-gray-100 hover:bg-gray-50"
                  >
                    {/* USER NAME */}
                    <td className="px-6 py-4 text-base text-[#303030]">
                      {member.user_profile?.name || "Unknown User"}
                    </td>

                    {/* MEMBERSHIP NAME */}
                    <td className="px-6 py-4 text-base text-[#303030]">
                      {member.plan?.plan_type}
                    </td>

                    {/* PLAN PRICE */}
                    <td className="px-6 py-4 text-base text-[#303030]">
                      ${member.plan?.price}
                    </td>

                    {/* ACTIVE / INACTIVE */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${
                          member.is_active
                            ? "text-white bg-[#6EEFC5]"
                            : "bg-[#FF7F7D] text-white"
                        }`}
                      >
                        {member.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 px-4 py-4 border-t border-gray-200 sm:flex-row sm:px-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, allMembers.length)} of {allMembers.length}{" "}
              entries
            </div>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              {/* Page Numbers */}
              <div className="items-center hidden gap-2 sm:flex">
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium ${
                      currentPage === page
                        ? "bg-gray-900 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
