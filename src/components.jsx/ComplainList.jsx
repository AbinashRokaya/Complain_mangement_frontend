import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";

const typeColors = {
  Minor: "bg-green-100 text-green-700 border border-green-300",
  Moderate: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Severe: "bg-orange-100 text-orange-700 border border-orange-300",
  Emergency: "bg-red-500 text-white",
};
const statusBadgeColors = {
  "In Progress": "bg-blue-500 text-white",
  Pending: "bg-yellow-400 text-gray-800",
  Resolved: "bg-green-500 text-white",
};

const filters = [
  { label: "All", active: "bg-blue-500 text-white ring-2 ring-blue-400/40" },
  {
    label: "Pending",
    active: "bg-amber-500 text-white ring-2 ring-amber-400/40",
  },
  {
    label: "In Progress",
    active: "bg-violet-500 text-white ring-2 ring-violet-400/40",
  },
  {
    label: "Resolved",
    active: "bg-emerald-500 text-white ring-2 ring-emerald-400/40",
  },
];

function ComplainList() {
  const {
    login,
    setIsError,
    setError,
    errors,
    success,
    setIsSucces,
    setSucess,
    IsSuccess,
  } = useContext(LoginContext);

  const [Complaindata, setDataComplain] = useState([]);
  const [statusComplain, setStatusComplain] = useState("All");
  const [categoryData, setCategoryData] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, [statusComplain]);

  const fetchComplaints = async () => {
    fetch(`/api/complain/${statusComplain}/${categoryData}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            throw data;
          }
          return data;
        });
      })
      .then((data) => {
        console.log("Complaints:", data);

        setDataComplain(
          data.complains.complains.sort(
            (a, b) => a.complain_id - b.complain_id,
          ),
        );

        if (statusComplain !== "All") {
          setIsSucces(true);
          setSucess("Complaints fetched successfully");
        }
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        if (err.detail && err.detail.length > 0) {
          setError(err.detail);
        } else {
          setError("Complain failed to fetch");
        }
      });
  };
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  p-6 font-sans">
      <div className="sticky top-16 bg-slate-950 px-10 py-5  mb-4 rounded-2xl">
        <div className="mb-7  top-0 ">
          <h1 className="text-white text-2xl font-bold">All Complaints</h1>
          <p className="text-gray-500 text-sm mt-1">
            Search by complaint ID or browse all complaints
          </p>
        </div>
        <div className="w-full flex justify-between items-center ">
          <div>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-6 justify-end">
            <select
              value={categoryData}
              onChange={(e) => setCategoryData(e.target.value)}
              className={`text-xs  border border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-800 text-gray-300 cursor-pointer`}
            >
              {["All", "Minor", "Moderate", "Severe", "Emergency"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {filters.map(({ label, active: activeClass }) => (
              <button
                key={label}
                onClick={() => setStatusComplain(label)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer
            ${
              statusComplain === label
                ? activeClass
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        {Complaindata.map((item, i) => {
          return (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-9 w-full  shadow-2xl flex flex-col mb-4 "
            >
              <div className="flex gap-6 items-center mb-4 justify-between">
                <div className="flex gap-5 justify-center items-center">
                  <h2 className="text-gray-500 text-xl font-bold">
                    {item.complain_id}
                  </h2>
                  <p
                    className={`${typeColors[item.category]} text-blue-500 text-sm mt-1 border border-gray-800 py-2 px-6 rounded-2xl`}
                  >
                    {item.category}
                  </p>
                </div>
                <div className="flex  justify-center items-center">
                  <p
                    className={`${statusBadgeColors[item.status]} text-blue-500 text-sm mt-1 border border-gray-800 py-2 px-6 rounded-2xl`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <h1 className="text-white text-2xl font-bold">
                  {item.complain_type}
                </h1>
                <p className="text-gray-300 text-sm mt-1 font-medium">
                  {item.description}
                </p>
              </div>
              <div className="flex gap-20 mb-4">
                <div className="flex gap-2 justify-center items-center">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="#f87171"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
                    <circle cx="12" cy="8" r="2.5" />
                  </svg>
                  <p className="text-gray-500 text-sm mt-1">{item.location}</p>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="#f87171"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.created_at}
                  </p>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="#f87171"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <p className="text-gray-500 text-sm mt-1">{item.user_name}</p>
                </div>
              </div>
              <div>
                <p className="text-blue-400 text-sm mt-1">
                  Assigned: Department of Roads → Lalitpur Branch
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComplainList;
