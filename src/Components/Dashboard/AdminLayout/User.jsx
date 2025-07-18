import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
// Fake Data
const fakeUsers = [
  {
    id: 1,
    name: "Sophia Ahmed",
    email: "sophia@example.com",
    role: "Provider",
    status: "Verified",
  },
  {
    id: 2,
    name: "Michael Ross",
    email: "michael@example.com",
    role: "Client",
    status: "Pending",
  },
  {
    id: 3,
    name: "Linda Zhang",
    email: "linda@example.com",
    role: "Provider",
    status: "Verified",
  },
  {
    id: 4,
    name: "Shohag Islam",
    email: "shohag@example.com",
    role: "Provider",
    status: "Verified",
  },
  {
    id: 5,
    name: "Ariana Gomez",
    email: "ariana@example.com",
    role: "Client",
    status: "Pending",
  },
  {
    id: 6,
    name: "Khan Rafi",
    email: "rafi@example.com",
    role: "Provider",
    status: "Verified",
  },
  {
    id: 7,
    name: "Emily Brown",
    email: "emily@example.com",
    role: "Client",
    status: "Verified",
  },
  {
    id: 8,
    name: "Mizanur Rahman",
    email: "mizan@example.com",
    role: "Provider",
    status: "Pending",
  },
  {
    id: 9,
    name: "Nora Ali",
    email: "nora@example.com",
    role: "Client",
    status: "Verified",
  },
];

const User = () => {
  const [users, setUsers] = useState(fakeUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  // Filtered & Paginated Users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "User has been removed.", "success");
      }
    });
  };

  return (
    <div className="container p-6 mx-auto">
      {/* Search */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-[36px] font-bold roboto">User Management</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 pl-8 border border-[#303030] rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow  border border-[#C1C1C1]">
        <table className="min-w-full table-auto roboto">
          <thead>
            <tr className="text-left font-medium text-xl text-[#303030] border-b border-b-[#C1C1C1]">
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="text-lg font-normal border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4">{user.name}</td>
                <td className="px-4 py-4">{user.email}</td>
                <td className="px-4 py-4">{user.role}</td>
                <td className="px-4 py-4">
                  {user.status === "Verified" ? (
                    <span className="px-2 py-1 cursor-pointer text-base bg-[#6EEFC5] text-white rounded-lg text-bas">
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-base cursor-pointer bg-[#FFCA6D] text-white  rounded-lg">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 text-base text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-400">
                  No users found.
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

export default User;
