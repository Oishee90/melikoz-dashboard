import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IoSearch } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import UserDetailsModal from "./UserDetailsModal";

// Sample data with 'year'
const userData = [
  { month: "Jan", users: 100000, year: "2024" },
  { month: "Feb", users: 90000, year: "2024" },
  { month: "Mar", users: 85000, year: "2024" },
  { month: "Apr", users: 78000, year: "2024" },
  { month: "May", users: 88000, year: "2024" },
  { month: "Jun", users: 60000, year: "2024" },
  { month: "Jul", users: 76000, year: "2024" },
  { month: "Aug", users: 92000, year: "2024" },
  { month: "Sep", users: 74000, year: "2024" },
  { month: "Oct", users: 15000, year: "2024" },
  { month: "Nov", users: 70000, year: "2024" },
  { month: "Dec", users: 48000, year: "2024" },
  { month: "Jan", users: 80000, year: "2023" },
  { month: "Feb", users: 82000, year: "2023" },
  { month: "Mar", users: 75000, year: "2023" },
  { month: "Apr", users: 70000, year: "2023" },
  { month: "May", users: 76000, year: "2023" },
  { month: "Jun", users: 65000, year: "2023" },
  { month: "Jul", users: 72000, year: "2023" },
  { month: "Aug", users: 81000, year: "2023" },
  { month: "Sep", users: 70000, year: "2023" },
  { month: "Oct", users: 55000, year: "2023" },
  { month: "Nov", users: 62000, year: "2023" },
  { month: "Dec", users: 60000, year: "2023" },
];
const users = [
  {
    id: 1,
    name: "Jon Doe",
    joinDate: "15 FEB 25",
    status: "Active",
    email: "jon.doe@example.com",
    followers: 120,
    following: 80,
  },
  {
    id: 2,
    name: "Alice Smith",
    joinDate: "22 MAR 25",
    status: "Suspend",
    email: "alice.smith@example.com",
    followers: 85,
    following: 40,
  },
  {
    id: 3,
    name: "Bob Johnson",
    joinDate: "12 JAN 25",
    status: "Active",
    email: "bob.johnson@example.com",
    followers: 102,
    following: 65,
  },
  {
    id: 4,
    name: "Jane Lee",
    joinDate: "01 MAY 25",
    status: "Suspend",
    email: "jane.lee@example.com",
    followers: 73,
    following: 33,
  },
  {
    id: 5,
    name: "Michael Chen",
    joinDate: "08 AUG 25",
    status: "Active",
    email: "michael.chen@example.com",
    followers: 134,
    following: 100,
  },
  {
    id: 6,
    name: "Sarah Kim",
    joinDate: "19 APR 25",
    status: "Active",
    email: "sarah.kim@example.com",
    followers: 99,
    following: 58,
  },
  {
    id: 7,
    name: "David Brown",
    joinDate: "30 JUN 25",
    status: "Suspend",
    email: "david.brown@example.com",
    followers: 56,
    following: 27,
  },
];

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userList, setUserList] = useState(users);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState(null);
  const dropdownRef = useRef(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, delete the user
        const updatedList = userList.filter((user) => user.id !== id);
        setUserList(updatedList); // Update the userList state
        // Close the dropdown after deletion
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setActiveUserId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (id, value) => {
    const updated = userList.map((user) =>
      user.id === id ? { ...user, status: value } : user
    );
    setUserList(updated);
  };
  const handleViewDetails = (id) => {
    const user = userList.find((user) => user.id === id); // Find the selected user by ID
    setSelectedUser(user); // Set the selected user details
    setModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null); // Clear selected user
  };
  // Filter chart data by selected year
  const filteredChartData = selectedYear
    ? userData.filter((item) => item.year === selectedYear)
    : userData;

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto overflow-y-auto p-6 mt-3">
        <div className="p-6 bg-white min-h-screen">
          {/* Top Bar Section */}
          <div className="bg-white p-6 mb-6 border border-[#BEBEBE]">
            <div className="flex justify-between items-start mb-9">
              <div className="flex gap-3 items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#000000] poppins">
                    Total User
                  </h2>
                  <p className="text-3xl font-normal mt-1 text-[#1C1C1C] poppins">
                    500K
                  </p>
                </div>
                <p className="text-[#4CE13F] text-sm mt-1">
                  ↑ 15% than last month
                </p>
              </div>
              <select
                className="border rounded px-3 py-1 text-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option disabled value="">
                  Sort by Year
                </option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={filteredChartData} barSize={20}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#009038" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#009038", fontSize: 16, fontWeight: "bold" }}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value
                  }
                />
                <Tooltip />
                <Bar dataKey="users" fill="#0a8f30" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 inter">
            <div className="relative w-full sm:w-[30%]">
              <input
                type="text"
                placeholder="Search by: username"
                className="w-full border border-gray-300 rounded-xl px-10 py-2 inter"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2b7c23]">
                <IoSearch />
              </span>
            </div>

            <div className="relative w-full sm:w-[25%]">
              <select
                className="appearance-none w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Suspend">Suspend</option>
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl">
              <thead className="bg-green-700 text-[#000000] font-normal">
                <tr>
                  <th className="px-4 py-2 text-left rounded-tl-xl rounded-bl-xl">
                    User Name
                  </th>
                  <th className="px-4 py-2 text-left">Join date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left rounded-tr-xl rounded-br-xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList
                  .filter((user) =>
                    user.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .filter(
                    (user) => !statusFilter || user.status === statusFilter
                  )
                  .map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white shadow-sm hover:shadow-xl transition border-b border-gray-300 cursor-pointer relative"
                    >
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.joinDate}</td>
                      <td className="px-4 py-3">
                        <select
                          value={user.status}
                          onChange={(e) =>
                            handleStatusChange(user.id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-xl text-sm font-medium ${
                            user.status === "Active"
                              ? "bg-[#DEEBFD] text-[#094EFF]"
                              : "bg-[#FFD6D6] text-[#FF0004]"
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Suspend">Suspend</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 rounded-r-xl relative">
                        <button
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            setActiveUserId(user.id);
                          }}
                          className="px-2 py-1 text-sm hover:bg-gray-100"
                        >
                          <BsThreeDots />
                        </button>

                        {isDropdownOpen && activeUserId === user.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-[4rem] mt-2 w-32 bg-white border shadow-lg rounded z-10"
                          >
                            <ul className="text-sm">
                              <li
                                onClick={() => handleViewDetails(user.id)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                View
                              </li>
                              <li
                                onClick={() => handleDelete(user.id)}
                                className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserDetailsModal
        user={selectedUser}
        isOpen={modalOpen}
        handleStatusChange={handleStatusChange}
        onClose={closeModal}
      />
    </div>
  );
};

export default AdminDashboard;
