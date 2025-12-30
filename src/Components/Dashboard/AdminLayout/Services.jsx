import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useGetServiceQuery } from "../../../Redux/feature/auth/authapi";
import ProviderApplications from "./ProviderApplication";
import ServiceManagement from "./ServiceManagement";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const { data: services = [] } = useGetServiceQuery();

  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

 
  const filteredServices = services.filter((s) =>
    s?.id?.toString().toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container px-6 mx-auto">
      <div>
        <ProviderApplications />
        <ServiceManagement />

        <div className="flex flex-col items-start justify-between gap-4 mt-16 mb-6 sm:flex-row sm:items-center">
          <h2 className="text-[36px] font-bold">Service Monitoring</h2>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by Service ID..."
              className="w-full sm:w-80 px-4 py-2 pl-10 border border-[#303030] rounded-lg focus:outline-none focus:border-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute text-gray-400 left-3 top-3" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-[#C1C1C1]">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left font-medium text-xl text-[#303030] border-b border-b-[#C1C1C1]">
                <th className="px-4 py-4">Service ID</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Client</th>
                <th className="px-4 py-4">Provider</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4">Requested</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service) => (
                <tr key={service.id} className="text-lg border-b hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium">{service.id || "N/A"}</td>
                  <td className="px-4 py-4">{service.booking_type || "N/A"}</td>
                  <td className="px-4 py-4">{service.client || "N/A"}</td>
                  <td className="px-4 py-4">{service.provider || "N/A"}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        service.status === "completed"
                          ? "bg-green-500"
                          : service.status === "active"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {service.status || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-4">{service.address || "N/A"}</td>
                  <td className="px-4 py-4">{service.date || "N/A"}</td>
                </tr>
              ))}
              {currentServices.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-lg text-center text-gray-500">
                    {searchTerm ? "No service found with this ID." : "No services available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* RESPONSIVE PAGINATION - 100% WORKING WITH SEARCH */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-end gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                  currentPage === 1 ? "bg-blue-500 text-white" : "bg-white border border-gray-300"
                }`}
              >
                1
              </button>

              {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}

              {/* Dynamic middle pages */}
              {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
                const pageNum = Math.max(2, currentPage - 1) + i;
                if (pageNum >= totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                      currentPage === pageNum ? "bg-blue-500 text-white" : "bg-white border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}

              {/* Last Page */}
              {totalPages > 1 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                    currentPage === totalPages ? "bg-blue-500 text-white" : "bg-white border border-gray-300"
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
    </div>
  );
};

export default Services;