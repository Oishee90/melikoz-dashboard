import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

// Updated Service Data
const fakeServices = [
  {
    id: "SVC001",
    type: "Conveyancing",
    client: "Michael Ross",
    provider: "Sophia Ahmed",
    status: "Completed",
    location: "Sydney, NSW",
    requested: "2025-07-01",
  },
  {
    id: "SVC002",
    type: "Title Review",
    client: "Emily Brown",
    provider: "Linda Zhang",
    status: "In Progress",
    location: "Melbourne, VIC",
    requested: "2025-07-05",
  },
  {
    id: "SVC003",
    type: "Contract Review",
    client: "Nora Ali",
    provider: "Shohag Islam",
    status: "Pending",
    location: "Brisbane, QLD",
    requested: "2025-07-10",
  },
  {
    id: "SVC004",
    type: "Legal Advice",
    client: "Ariana Gomez",
    provider: "Khan Rafi",
    status: "Completed",
    location: "Perth, WA",
    requested: "2025-07-03",
  },
  {
    id: "SVC005",
    type: "Pre-Purchase Report",
    client: "Linda Zhang",
    provider: "Mizanur Rahman",
    status: "In Progress",
    location: "Adelaide, SA",
    requested: "2025-07-12",
  },
];

const Services = () => {
  const [services, setServices] = useState(fakeServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 4;

  const filteredServices = services.filter((s) =>
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  return (
    <div className="container p-6 mx-auto">
      {/* Search */}
      <div className="flex items-center justify-between mb-4">
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
                <td className="px-4 py-4">{service.id}</td>
                <td className="px-4 py-4">{service.type}</td>
                <td className="px-4 py-4">{service.client}</td>
                <td className="px-4 py-4">{service.provider}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-white text-base ${
                      service.status === "Completed"
                        ? "bg-green-500"
                        : service.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-4 py-4">{service.location}</td>
                <td className="px-4 py-4">{service.requested}</td>
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
  );
};

export default Services;
