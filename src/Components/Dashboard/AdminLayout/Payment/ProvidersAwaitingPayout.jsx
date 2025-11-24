import React from "react";
import { useGetAwaittingQuery } from "../../../../Redux/feature/auth/authapi";

export default function ProvidersAwaitingPayout() {
  const { data: providers, isLoading, isError } = useGetAwaittingQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching providers!</p>;
  if (!providers || providers.length === 0)
    return <p className="text-gray-500">No providers awaiting payout.</p>;

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
            {/* Left section - Bank info */}
            <div>
              <h3 className="mb-1 text-base font-semibold text-gray-900">
                {provider.bank_name} • {provider.account_number}
              </h3>
              <p className="text-sm text-gray-500">
                Requested:{" "}
                {new Date(provider.requested_at).toLocaleDateString()}
              </p>
            </div>

            {/* Right section - Amount and actions */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-lg font-bold text-gray-900">
                ${provider.amount}
              </span>
              <div className="flex gap-3">
                <button className="px-5 py-2 text-base font-medium text-white transition-colors bg-[#10B981] rounded-lg hover:bg-teal-600">
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
