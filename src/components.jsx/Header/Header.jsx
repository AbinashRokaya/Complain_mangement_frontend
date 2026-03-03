import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

function Header() {
  const { userData, logout, loginStatus } = useContext(LoginContext);
  const handdleLogout = () => {
    console.log("abinash logout");
    logout();
  };
  return (
    <div className="  w-full fixed h-16   p-4 flex justify-between items-center bg-slate-200 shadow-lg">
      <div>Abinash</div>
      <div className="flex gap-4 justify-center items-center ">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${isActive ? "bg-orange-400 text-white" : "bg-slate-400 "} px-5 py-2 rounded-full font-bold font-sans text-sm shadow-xl`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${isActive ? "bg-orange-400 text-white" : "bg-slate-400"} px-5 py-2 rounded-full font-bold font-sans text-sm shadow-xl`
          }
        >
          Admin
        </NavLink>
        <NavLink
          to="/complaint_List"
          className={({ isActive }) =>
            `${isActive ? "bg-orange-400 text-white" : "bg-slate-400"} px-5 py-2 rounded-full font-bold font-sans text-sm shadow-xl`
          }
        >
          Complain List
        </NavLink>
        <NavLink
          to="/complaint"
          className={({ isActive }) =>
            `${isActive ? "bg-orange-400 text-white" : "bg-slate-400"} px-5 py-2 rounded-full font-bold font-sans text-sm shadow-xl`
          }
        >
          File Complaint
        </NavLink>
        <NavLink
          to="/superAdmin"
          className={({ isActive }) =>
            `${isActive ? "bg-orange-400 text-white" : "bg-slate-400"} px-5 py-2 rounded-full font-bold font-sans text-sm shadow-xl`
          }
        >
          Super Admin
        </NavLink>
        {loginStatus ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${isActive ? "bg-orange-400 text-white" : "bg-slate-400"} px-5 py-2 rounded-full font-bold font-sans text-sm shadow-xl`
            }
            onClick={handdleLogout}
          >
            Logout
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${isActive ? "bg-orange-400 text-white" : "bg-slate-400"} px-5 py-2 rounded-full font-bold font-sans text-sm shadow-xl`
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
// import React from "react";
// import { NavLink } from "react-router-dom";

// function Header() {
//   return (
//     <div className="w-full px-8 py-4 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-700 shadow-lg">
//       {/* Logo / Brand */}
//       <div className="text-white text-2xl font-bold tracking-widest uppercase">
//         Abi<span className="text-orange-400">nash</span>
//       </div>

//       {/* Nav Links */}
//       <div className="flex gap-2 items-center">
//         {["home", "contact", "about"].map((route) => (
//           <NavLink
//             key={route}
//             to={`/${route}`}
//             className={({ isActive }) =>
//               `capitalize px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
//                 isActive
//                   ? "bg-orange-400 text-white shadow-md shadow-orange-300/40"
//                   : "text-slate-300 hover:bg-slate-600 hover:text-white"
//               }`
//             }
//           >
//             {route}
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Header;
