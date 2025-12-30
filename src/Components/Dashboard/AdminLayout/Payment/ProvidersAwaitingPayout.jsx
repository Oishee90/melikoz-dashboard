import React from "react";
import {
  useGetAwaittingQuery,
  useApprovePayoutMutation,
} from "../../../../Redux/feature/auth/authapi";
import Swal from "sweetalert2";

export default function ProvidersAwaitingPayout() {
  const { data: providers, isLoading, isError, refetch } =
    useGetAwaittingQuery();

  const [approvePayout] = useApprovePayoutMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching providers!</p>;
  // if (!providers || providers.length === 0)
  //   return <p className="text-gray-500">No providers awaiting payout.</p>;

  // Approve Handler
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this payout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
    }).then((result) => {
      if (result.isConfirmed) {
        approvePayout({ id })
          .unwrap()
          .then(() => {
            Swal.fire("Approved!", "The payout has been approved.", "success");
            refetch(); // refresh data
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="pt-8 roboto">
      <h1 className="text-4xl font-bold text-[#303030]">
        Providers Awaiting Payout
      </h1>

      <div className="mt-4 bg-white rounded-lg shadow-sm">
        {providers.map((provider, index) => (
          <div
            key={provider.id}
            className={`p-5 flex items-center justify-between ${
              index !== providers.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            {/* Left section */}
            <div>
              <h3 className="mb-1 text-base font-semibold text-gray-900">
                {provider.bank_name} • {provider.account_number}
              </h3>
              <p className="text-sm text-gray-500">
                Requested:{" "}
                {new Date(provider.requested_at).toLocaleDateString()}
              </p>
            </div>

            {/* Right section */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-lg font-bold text-gray-900">
                ${provider.amount}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    provider.status === "pending" && handleApprove(provider.id)
                  }
                  className={`px-5 py-2 text-base font-medium text-white transition-colors rounded-lg
                    ${
                      provider.status?.toLowerCase() === "pending"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-[#10B981] hover:bg-teal-600"
                    }
                  `}
                >
                  {provider.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
