import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";

const statusColors = {
  "In Progress": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Resolved: "bg-green-100 text-green-700",
};

const statusBadgeColors = {
  "In Progress": "bg-blue-500 text-white",
  Pending: "bg-yellow-400 text-gray-600",
  Resolved: "bg-green-500 text-white",
};

const typeColors = {
  Minor: "bg-green-100 text-green-700 border border-green-300",
  Moderate: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Severe: "bg-orange-100 text-orange-700 border border-orange-300",
  Emergency: "bg-red-500 text-white",
};

export default function AdminPanel() {
  const [filter, setFilter] = useState("All Status");
  const [statuses, setStatuses] = useState("All");
  const [updateStatus, setUpdateStatus] = useState("Pending");
  const [Complaindata, setDataComplain] = useState([]);
  const [complainId, setComplainId] = useState(0);
  const [totalcomplain, settotalcomplain] = useState(0);
  const [totalresolved, settotalresolved] = useState(0);
  const [totalinprogrss, settotalinprogess] = useState(0);
  const [totalpending, settotalpending] = useState(0);
  const [department, setdepartment] = useState("");
  const [branch, setbranch] = useState("");

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

  const handleStatusChange = (id, value) => {
    setComplainId(id);
    setUpdateStatus((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetchComplaints();
    fetchallcomplaint();
  }, [statuses]);
  const fetchallcomplaint = async () => {
    fetch(`/api/complain/All`, {
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
        // console.log("Complaints:", data);

        settotalcomplain(data.complains.complains.length);
        console.log("total", totalcomplain);
        settotalinprogess(
          data.complains.complains.filter(
            (item) => item.status == "In Progress",
          ).length,
        );
        settotalpending(
          data.complains.complains.filter((item) => item.status == "Pending")
            .length,
        );

        settotalresolved(
          data.complains.complains.filter((item) => item.status == "Resolved")
            .length,
        );

        setbranch(data.complains.complains[0].location);
        setdepartment(data.complains.complains[0].department);

        // if (statusComplain !== "All") {
        //   setIsSucces(true);
        //   setSucess("Complaints fetched successfully");
        // }
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        if (err.detail && err.detail.length > 0) {
          setError(err.detail);
        } else {
          setError("Complain failed");
        }
      });
  };
  const fetchComplaints = async () => {
    fetch(`/api/complain/${statuses}`, {
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

        // if (statusComplain !== "All") {
        //   setIsSucces(true);
        //   setSucess("Complaints fetched successfully");
        // }
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        if (err.detail && err.detail.length > 0) {
          setError(err.detail);
        } else {
          setError("Complain failed");
        }
      });
  };

  useEffect(() => {
    fetchUpdateStatusComplaints();
  }, [updateStatus]);
  const fetchUpdateStatusComplaints = async () => {
    if (!complainId) return;
    fetch(`/api/complain/status/${complainId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: updateStatus[complainId],
      }),
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

        fetchComplaints();
        setComplainId(0);

        // if (statusComplain !== "All") {
        //   setIsSucces(true);
        //   setSucess("Complaints fetched successfully");
        // }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);

        if (err.detail && err.detail.length > 0) {
          // Check if detail items are objects (FastAPI validation errors) or strings
          const message =
            typeof err.detail[0] === "object"
              ? err.detail.map((e) => e.msg).join(", ")
              : err.detail;
          setError(message);
        } else {
          setError("Complain failed");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans pt-22 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-700 rounded-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-500 text-sm">
            Manage and resolve transportation complaints
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 flex items-center gap-4 ">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-gray-500 text-3xl font-bold">{totalcomplain}</p>
          </div>
        </div>

        <div className="bg-gray-900  border border-gray-800 rounded-2xl p-4 flex items-center gap-4 ">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-gray-500 text-3xl font-bold">{totalpending}</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800  p-4 flex items-center gap-4 ">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="text-gray-500 text-3xl font-bold">{totalinprogrss}</p>
          </div>
        </div>

        <div className="bg-gray-900  border border-gray-800 rounded-2xl p-4 flex items-center gap-4 -">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Resolved</p>
            <p className="text-gray-500 text-3xl font-bold">{totalresolved}</p>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { name: `${department} Department`, code: "TRF" },
          { name: `${branch} Branch` },
        ].map((dept) => (
          <div
            key={dept.code}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-300">{dept.name}</p>
              {/* <p className="text-xs text-gray-500">Code: {dept.code}</p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Complaints Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl  shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-gray-200">All Complaints</h2>
          <select
            value={statuses}
            onChange={(e) => setStatuses(e.target.value)}
            className="text-sm border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-800"
          >
            {["All", "Pending", "In Progress", "Resolved"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-xs uppercase border-b border-gray-800">
              {[
                "ID",
                "User",
                "Type",
                "Category",
                "Location",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-6 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Complaindata.map((c, i) => (
              <tr
                key={c.complain_id}
                className={`border-b border-gray-800 hover:bg-gray-800 transition-colors `}
              >
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                  {c.complain_id}
                </td>
                <td className="px-6 py-4 text-gray-400 font-medium">
                  {c.user_name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[c.category]}`}
                  >
                    {c.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{c.complain_type}</td>
                <td className="px-6 py-4 text-gray-400">{c.location}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColors[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={updateStatus[c.complain_id]}
                    key={c.complain_id}
                    onChange={(e) => {
                      handleStatusChange(c.complain_id, e.target.value);
                    }}
                    className={`text-xs  border border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-800 text-gray-300 cursor-pointer`}
                  >
                    {["Pending", "In Progress", "Resolved"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
