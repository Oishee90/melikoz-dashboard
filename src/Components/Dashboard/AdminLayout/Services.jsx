import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { useGetServiceQuery } from "../../../Redux/feature/auth/authapi";
import ProviderApplications from "./ProviderApplication";
import ServiceManagement from "./ServiceManagement";

// Updated Service Data

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const { data: services = [] } = useGetServiceQuery();
  const filteredServices = services.filter((s) =>
    s?.id?.toString().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  return (
    <div className="container px-6 mx-auto">
      <div>
        {/* provider */}
        <ProviderApplications></ProviderApplications>
        {/* services managemnet */}
        <ServiceManagement></ServiceManagement>
        {/* service */}
        <div className="flex items-center justify-between mt-16 mb-4">
          <h2 className="mb-4 text-[36px] font-bold">Service Monitoring</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Service ID..."
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
                <tr
                  key={service.id}
                  className="text-lg font-normal border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4">{service.id || "N/A"}</td>
                  <td className="px-4 py-4">{service.booking_type || "N/A"}</td>
                  <td className="px-4 py-4">{service.client || "N/A"}</td>
                  <td className="px-4 py-4">{service.provider || "N/A"}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-white text-base ${
                        service.status === "completed"
                          ? "bg-green-500"
                          : service.status === "active"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">{service.address || "N/A"}</td>
                  <td className="px-4 py-4">{service.date || "N/A"}</td>
                </tr>
              ))}
              {currentServices.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-400">
                    No services found.
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
      {/* Search */}
    </div>
  );
};

export default Services;
