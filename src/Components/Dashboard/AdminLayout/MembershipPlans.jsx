import React, { useState } from "react";
import { Check } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import EditPlanModal from "./EditPlanModal";

export default function MembershipPlans() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };
  const [plans] = useState([
    {
      id: 1,
      name: "Free",
      price: "$ 0/month",
      color: "white",
      borderColor: "gray-300",
      buttonColor: "blue-600",
      buttonHover: "blue-700",
      features: ["Basic Support", "Limited Access"],
    },
    {
      id: 2,
      name: "Silver",
      price: "$ 99/15 Days",
      color: "gray-200",
      borderColor: "gray-400",
      buttonColor: "gray-500",
      buttonHover: "gray-600",
      features: ["Job Boosting", "Limited Priority Access", "Basic Analytics"],
    },
    {
      id: 3,
      name: "Platinum",
      price: "$ 299/30 Days",
      color: "cyan-100",
      borderColor: "cyan-400",
      buttonColor: "cyan-400",
      buttonHover: "cyan-500",
      textColor: "cyan-700",
      features: [
        "Premium Support",
        "Featured Listing",
        "Dedicated Account Manager",
      ],
    },
    {
      id: 4,
      name: "Gold",
      price: "$ 499/1 Years",
      color: "yellow-200",
      borderColor: "yellow-400",
      buttonColor: "yellow-400",
      buttonHover: "yellow-500",
      textColor: "yellow-800",
      features: [
        "Top Search Ranking",
        "Unlimited Job Requests",
        "Advanced Analytics",
      ],
    },
  ]);

  return (
    <div className="min-h-screen p-8 roboto">
      <div className="max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold text-[#303030]">Membership</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-${plan.color} border-2 border-${plan.borderColor} rounded-2xl p-6 relative`}
              style={{
                backgroundColor:
                  plan.color === "white"
                    ? "#ffffff"
                    : plan.color === "gray-200"
                    ? "#e5e7eb"
                    : plan.color === "cyan-100"
                    ? "#cffafe"
                    : "#fef08a",
                borderColor:
                  plan.borderColor === "gray-300"
                    ? "#d1d5db"
                    : plan.borderColor === "gray-400"
                    ? "#9ca3af"
                    : plan.borderColor === "cyan-400"
                    ? "#22d3ee"
                    : "#facc15",
              }}
            >
              {/* Edit Icon */}
              <button
                onClick={() => handleEdit(plan)}
                className="absolute text-gray-600 top-4 right-4 hover:text-gray-800"
              >
                <FaRegEdit className="w-4 h-4" />
              </button>

              {/* Plan Header */}
              <div className="mb-6">
                <h2
                  className={`text-2xl font-bold mb-1 ${
                    plan.textColor ? `text-${plan.textColor}` : "text-gray-800"
                  }`}
                  style={{
                    color:
                      plan.textColor === "cyan-700"
                        ? "#0e7490"
                        : plan.textColor === "yellow-800"
                        ? "#854d0e"
                        : "#1f2937",
                  }}
                >
                  {plan.name}
                </h2>
                <p
                  className={`text-xl font-semibold ${
                    plan.textColor ? `text-${plan.textColor}` : "text-gray-700"
                  }`}
                  style={{
                    color:
                      plan.textColor === "cyan-700"
                        ? "#0e7490"
                        : plan.textColor === "yellow-800"
                        ? "#854d0e"
                        : "#374151",
                  }}
                >
                  {plan.price}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 ${
                        plan.textColor
                          ? `text-${plan.textColor}`
                          : "text-gray-700"
                      }`}
                      style={{
                        color:
                          plan.textColor === "cyan-700"
                            ? "#0e7490"
                            : plan.textColor === "yellow-800"
                            ? "#854d0e"
                            : "#374151",
                      }}
                    />
                    <span
                      className={`text-sm ${
                        plan.textColor
                          ? `text-${plan.textColor}`
                          : "text-gray-700"
                      }`}
                      style={{
                        color:
                          plan.textColor === "cyan-700"
                            ? "#0e7490"
                            : plan.textColor === "yellow-800"
                            ? "#854d0e"
                            : "#374151",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold text-white transition`}
                style={{
                  backgroundColor:
                    plan.buttonColor === "blue-600"
                      ? "#2563eb"
                      : plan.buttonColor === "gray-500"
                      ? "#6b7280"
                      : plan.buttonColor === "cyan-400"
                      ? "#22d3ee"
                      : "#facc15",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor =
                    plan.buttonHover === "blue-700"
                      ? "#1d4ed8"
                      : plan.buttonHover === "gray-600"
                      ? "#4b5563"
                      : plan.buttonHover === "cyan-500"
                      ? "#06b6d4"
                      : "#eab308";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor =
                    plan.buttonColor === "blue-600"
                      ? "#2563eb"
                      : plan.buttonColor === "gray-500"
                      ? "#6b7280"
                      : plan.buttonColor === "cyan-400"
                      ? "#22d3ee"
                      : "#facc15";
                }}
              >
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <EditPlanModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        plan={selectedPlan}
      />
    </div>
  );
}
