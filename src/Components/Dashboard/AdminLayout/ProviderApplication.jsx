import React, { useState, useMemo } from "react";
import { MoreVertical } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import FileViewModal from "./FileViewModal";
import {
  useGetProvidersQuery,
  useUpdateProviderStatusMutation,
} from "../../../Redux/feature/auth/authapi";

const ProviderApplications = () => {
  const { data, isLoading, isError } = useGetProvidersQuery();
  const [updateStatus] = useUpdateProviderStatusMutation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      item.provider_profile.user_name.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(start, start + itemsPerPage);

  const StatusBadge = ({ status }) => {
    const colors = {
      approved: "bg-[#6EEFC5] text-white",
      rejected: "bg-[#FE272C] text-white",
      pending: "bg-[#FFCA6D] text-white",
    };
    return (
      <span
        className={`px-6 py-2 rounded-xl text-base font-medium ${
          colors[status.toLowerCase()]
        }`}
      >
        {status}
      </span>
    );
  };

  const handleStatusChange = async (id, status) => {
    try {
      // API call with { approval_status: "approved" } format
      await updateStatus({ id, approval_status: status }).unwrap();
      setOpenMenu(null);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching providers!</p>;

  return (
    <div>
      {selectedFile && (
        <FileViewModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-[36px] font-bold">Provider Applications</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Name..."
            className="px-3 py-1 pl-8 border border-[#303030] rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-[#C1C1C1]">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left font-medium text-xl text-[#303030] border-b">
              <th className="p-3">Provider Name</th>
              <th className="p-3">Service Type</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Location</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Certificate</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => {
              const profile = item.provider_profile.user_name;
              return (
                <tr key={item.id} className="text-lg font-normal border-b">
                  <td className="p-3">{profile.name}</td>
                  <td className="p-3">
                    {item.provider_profile.category || "N/A"}
                  </td>
                  <td className="p-3">
                    {item.provider_profile.years_of_experience} yrs
                  </td>
                  <td className="p-3">{profile.address || "N/A"}</td>
                  <td className="p-3">${item.provider_profile.work_rate}</td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        setSelectedFile({
                          document_type: item.document_type,
                          url: item.document_file,
                          type: "application/pdf",
                        })
                      }
                      className="px-4 py-2 text-base text-white bg-[#006745] rounded-md"
                    >
                      View File
                    </button>
                  </td>
                  <td className="p-3">
                    <StatusBadge
                      status={item.provider_profile.application_status}
                    />
                  </td>
                  <td className="relative p-3">
                    <MoreVertical
                      className="cursor-pointer"
                      onClick={() =>
                        setOpenMenu(openMenu === item.id ? null : item.id)
                      }
                    />
                    {openMenu === item.id && (
                      <div className="absolute right-0 z-10 w-32 mt-2 bg-white border rounded-md shadow-md">
                        <button
                          onClick={() =>
                            handleStatusChange(item.id, "approved")
                          }
                          className="block w-full px-3 py-2 hover:bg-gray-100"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(item.id, "rejected")
                          }
                          className="block w-full px-3 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <span>
          Showing {start + 1} to{" "}
          {Math.min(start + itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} providers
        </span>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`border px-3 py-1 rounded ${
                page === i + 1 ? "bg-black text-white" : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderApplications;
