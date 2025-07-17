import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { FaSuitcase, FaUsers, FaChartLine } from "react-icons/fa";

const data = [
  { month: "Jan", jobs: 100 },
  { month: "Feb", jobs: 180 },
  { month: "Mar", jobs: 150 },
  { month: "Apr", jobs: 240 },
  { month: "May", jobs: 220 },
  { month: "Jun", jobs: 310 },
];
const AdminDashboard = () => {
  
  
  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-lg font-semibold">Dashboard Overview</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
        {/* Total Jobs */}
        <div className="flex items-center justify-between p-4 text-red-700 bg-red-100 rounded shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 text-white bg-red-500 rounded-full">
              <FaSuitcase />
            </div>
            <div>
              <p className="text-sm font-semibold">Total Jobs</p>
              <p className="text-xs">1,245 Jobs Completed</p>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="flex items-center justify-between p-4 text-green-700 bg-green-100 rounded shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 text-white bg-green-500 rounded-full">
              <FaUsers />
            </div>
            <div>
              <p className="text-sm font-semibold">Active Users</p>
              <p className="text-xs">563 Providers Online</p>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="flex items-center justify-between p-4 text-blue-700 bg-blue-100 rounded shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 text-white bg-blue-500 rounded-full">
              <FaChartLine />
            </div>
            <div>
              <p className="text-sm font-semibold">Performance</p>
              <p className="text-xs">🔵 92% Positive Feedback</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="mb-2 text-sm font-semibold">
          Jobs Trend (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="jobs"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorJobs)"
            />
            <Line
              type="monotone"
              dataKey="jobs"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
