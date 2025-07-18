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
import { FaSuitcase, FaUserAlt, FaChartLine } from "react-icons/fa";

const data = [
  { month: "Jan", jobs: 100 },
  { month: "Feb", jobs: 180 },
  { month: "Mar", jobs: 150 },
  { month: "May", jobs: 220 },
  { month: "Jun", jobs: 310 },
];
const AdminDashboard = () => {
  return (
    <div className="container p-6 mx-auto roboto">
      <h2 className="mb-4 text-[36px] font-bold">Dashboard Overview</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
        {/* Total Jobs */}
        <div className="flex items-center justify-between p-8 text-white rounded-2xl  shadow bg-[#F98587]">
          <div className="flex items-center gap-3">
            <div className="p-6 bg-white rounded-full text-[#F98587]">
              <FaSuitcase className="text-xl" />
            </div>
            <div>
              <p className="text-white roboto font-semibold text-[36px]">
                Total Jobs
              </p>
              <p className="text-lg font-medium text-white roboto">
                1,245 Jobs Completed
              </p>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="flex items-center justify-between p-8 text-white rounded-2xl  shadow bg-[#10B981]">
          <div className="flex items-center gap-3">
            <div className="p-6 bg-white rounded-full text-[#10B981]">
              <FaUserAlt className="text-xl" />
            </div>
            <div>
              <p className="text-white roboto font-semibold text-[36px]">
                Active Users
              </p>
              <p className="text-lg font-medium text-white roboto">
                563 Providers Online
              </p>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="flex items-center justify-between p-8 text-white rounded-2xl  shadow bg-[#0097EE]">
          <div className="flex items-center gap-3">
            <div className="p-6 bg-white rounded-full text-[#0097EE]">
              <FaChartLine className="text-xl" />
            </div>
            <div>
              <p className="text-white roboto font-semibold text-[36px]">
                Performance
              </p>
              <p className="text-lg font-medium text-white roboto">
                🔵 92% Positive Feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 mt-12 bg-white shadow border border-[#C1C1C1] rounded-lg">
        <h3 className="mb-2 text-[#303030] font-bold roboto text-[24px]">
          Jobs Trend (Last 6 Months)
        </h3>
        <ResponsiveContainer
          className="font-medium roboto text-[#303030] mt-9"
          width="100%"
          height={300}
        >
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
