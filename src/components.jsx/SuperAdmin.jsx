import React, { use, useContext, useEffect, useState } from "react";
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
const district = [
  "Achham",
  "Arghakhanchi",
  "Baglung",
  "Baitadi",
  "Bajhang",
  "Bajura",
  "Banke",
  "Bara",
  "Bardiya",
  "Bhaktapur",
  "Bhojpur",
  "Chitwan",
  "Dadeldhura",
  "Dailekh",
  "Dang",
  "Darchula",
  "Dhading",
  "Dhankuta",
  "Dhanusha",
  "Dolakha",
  "Dolpa",
  "Doti",
  "Eastern Rukum",
  "Gorkha",
  "Gulmi",
  "Humla",
  "Ilam",
  "Jajarkot",
  "Jhapa",
  "Jumla",
  "Kailali",
  "Kalikot",
  "Kanchanpur",
  "Kapilvastu",
  "Kaski",
  "Kathmandu",
  "Kavrepalanchok",
  "Khotang",
  "Lalitpur",
  "Lamjung",
  "Mahottari",
  "Makwanpur",
  "Manang",
  "Morang",
  "Mugu",
  "Mustang",
  "Myagdi",
  "Nawalpur",
  "Nuwakot",
  "Okhaldhunga",
  "Palpa",
  "Panchthar",
  "Parasi",
  "Parbat",
  "Parsa",
  "Pyuthan",
  "Ramechhap",
  "Rasuwa",
  "Rautahat",
  "Rolpa",
  "Rupandehi",
  "Salyan",
  "Sankhuwasabha",
  "Saptari",
  "Sarlahi",
  "Sindhuli",
  "Sindhupalchok",
  "Siraha",
  "Solukhumbu",
  "Sunsari",
  "Surkhet",
  "Syangja",
  "Tanahun",
  "Taplejung",
  "Tehrathum",
  "Udayapur",
  "Western Rukum",
];

function SuperAdmin() {
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

  const [roleUpdate, setRoleIpdate] = useState("User");
  const [statusFilter, setStatusFilter] = useState("All");
  const [branch, setBranch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [AllUser, setAllUser] = useState([]);
  const [userId, setUserId] = useState(0);
  const [currentbranch, setCurrentbranch] = useState("");
  const [currentdepartment, setCurrentDepartment] = useState("");
  const [currentrole, setCurrentRole] = useState("");

  const handleRoleChange = (id, value) => {
    setUserId(id);
    setCurrentRole(value);
    setRole((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleDepartmentChange = (id, value) => {
    setUserId(id);
    setCurrentDepartment(value);
    setDepartment((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleBranchChange = (id, value) => {
    setUserId(id);
    setCurrentbranch(value);
    setBranch((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handdleAdd = (id) => {
    console.log("role id", role[id]);
    console.log("role", role);
    fetch("/api/department/post", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department_name: department[id],
        branch_name: branch[id],
        role: role[id],
        id: id,
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
        fetchUser();

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
    fetchUser();
  }, [statusFilter]);

  const fetchUser = async () => {
    fetch(`/api/department/${statusFilter}`, {
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

        setAllUser(data.users.user.sort((a, b) => a.id - b.id));

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
          <h1 className="text-white text-2xl font-bold">Super Admin Panel</h1>
          <p className="text-gray-500 text-sm">Manage and user and admin</p>
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
            <p className="text-gray-500 text-3xl font-bold">5</p>
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
            <p className="text-gray-500 text-3xl font-bold">2</p>
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
            <p className="text-gray-500 text-3xl font-bold">3</p>
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
            <p className="text-gray-500 text-3xl font-bold">4</p>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { name: "Traffic Department", code: "TRF" },
          { name: "Road Department", code: "RD" },
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
              <p className="font-semibold text-gray-600">{dept.name}</p>
              <p className="text-xs text-gray-500">Code: {dept.code}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Complaints Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl  shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-gray-200">All Complaints</h2>
          </div>
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => setStatusFilter("All")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer bg-blue-500 text-white ring-2 ring-blue-400/40 hover:scale-110`}
            >
              All
            </button>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-800"
            >
              {district.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-xs uppercase border-b border-gray-800">
              {[
                "ID",
                "User",
                "adress",
                "branch",
                "Brach Action",
                "department",
                "department Action",
                "Role",
                "Role Action",
              ].map((h) => (
                <th key={h} className="px-6 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AllUser.map((c, i) => (
              <tr
                key={c.id}
                className={`border-b border-gray-800 hover:bg-gray-800 transition-colors `}
              >
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                  {c.id}
                </td>
                <td className="px-6 py-4 text-gray-400 font-medium">
                  {c.name}
                </td>
                <td className="px-6 py-4 text-gray-400 font-medium">
                  {c.address}
                </td>
                <td className="px-6 py-4 text-gray-400 font-medium">
                  {c.branch_name}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={branch[c.id]}
                    key={c.id}
                    onChange={(e) => {
                      handleBranchChange(c.id, e.target.value);
                    }}
                    className={`text-xs  border border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-800 text-gray-300 cursor-pointer`}
                  >
                    {district.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-400">{c.department_name}</td>
                <td className="px-6 py-4">
                  <select
                    value={department[c.id]}
                    key={c.id}
                    onChange={(e) => {
                      handleDepartmentChange(c.id, e.target.value);
                    }}
                    className={`text-xs  border border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-800 text-gray-300 cursor-pointer`}
                  >
                    {["Road", "Transport"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-400 font-medium">
                  {c.roll}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={role[c.id]}
                    key={c.id}
                    onChange={(e) => {
                      handleRoleChange(c.id, e.target.value);
                    }}
                    className={`text-xs  border border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-800 text-gray-300 cursor-pointer`}
                  >
                    {["user", "admin"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    key={c.id}
                    onClick={(e) => {
                      handdleAdd(c.id);
                    }}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer bg-blue-500 text-white ring-2 ring-blue-400/40 hover:scale-110`}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuperAdmin;
