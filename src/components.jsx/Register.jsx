import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
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

function Register() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const nagavitor = useNavigate();

  const handleregister = (e) => {
    e.preventDefault();
    if (!name || !password || !email || !address) return;

    // console.log(name, password);

    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        email: email,
        password: password,
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
        console.log("Server response:", data);

        setIsSucces(true);
        setSucess("Successfully register");

        login(data);
        nagavitor("/home");
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        if (err.detail && err.detail.length > 0) {
          setError(err.detail);
        } else {
          setError("Register failed");
        }
      });
  };

  return (
    <div className=" min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <form
        action="#"
        onSubmit={handleregister}
        className="w-full max-w-md  bg-gray-900 border border-gray-800 rounded-2xl p-4 flex justify-center flex-col rounded-xl shadow-slate-800 shadow-2xl px-8"
      >
        <div className="flex justify-center flex-col items-center mb-8 mt-4 ">
          <h1 className="text-white text-2xl font-bold">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">
            Register to file and track complaints
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex flex-col gap-2 mb-6">
            <label
              htmlFor=""
              className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label
              htmlFor=""
              className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
            >
              Address
            </label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              <option value="">Select type...</option>
              {district.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label
              htmlFor=""
              className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 ">
            <label
              htmlFor=""
              className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className=" flex justify-center items-center mt-6 ">
            <button className="w-md px-7 py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm rounded-lg transition-colors cursor-pointer">
              Create Account
            </button>
          </div>
          <div className="mt-4 flex justify-center item">
            <p className="text-gray-500 text-sm mt-1">
              Already have an account?{" "}
            </p>
            <Link
              to="/login"
              className="text-red-600 px-2 hover:text-red-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );

  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
  //       {/* Card */}
  //       <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
  //         {/* Header */}
  //         <div className="text-center mb-6">
  //           <h1 className="text-3xl font-bold text-slate-800 mb-1">
  //             Create Account
  //           </h1>
  //           <p className="text-slate-500 text-sm">
  //             Register to file and track complaints
  //           </p>
  //         </div>

  //         {/* Form */}
  //         <form className="space-y-4">
  //           {/* Full Name */}
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-1">
  //               Full Name
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter your full name"
  //               className="w-full px-4 h-11 bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
  //             />
  //           </div>

  //           {/* Address */}
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-1">
  //               Address
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter your address"
  //               className="w-full px-4 h-11 bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
  //             />
  //           </div>

  //           {/* Phone */}
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-1">
  //               Phone
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter phone number"
  //               className="w-full px-4 h-11 bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
  //             />
  //           </div>

  //           {/* Email */}
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-1">
  //               Email
  //             </label>
  //             <input
  //               type="email"
  //               placeholder="Enter your email"
  //               className="w-full px-4 h-11 bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
  //             />
  //           </div>

  //           {/* Password */}
  //           <div>
  //             <label className="block text-sm font-medium text-slate-700 mb-1">
  //               Password
  //             </label>
  //             <input
  //               type="password"
  //               placeholder="Enter password"
  //               className="w-full px-4 h-11 bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
  //             />
  //           </div>

  //           {/* Button */}
  //           <button
  //             type="submit"
  //             className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:from-green-400 hover:to-emerald-400 hover:shadow-lg transition duration-300"
  //           >
  //             Create Account
  //           </button>
  //         </form>

  //         {/* Footer */}
  //         <p className="text-center text-sm text-slate-500 mt-6">
  //           Already have an account?
  //           <span className="text-green-600 font-medium cursor-pointer hover:underline ml-1">
  //             Login
  //           </span>
  //         </p>
  //       </div>
  //     </div>
  //   );

  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4">
  //       {/* Glowing background blobs */}
  //       <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl top-20 left-1/4 pointer-events-none" />
  //       <div className="absolute w-72 h-72 bg-teal-500/10 rounded-full blur-3xl bottom-20 right-1/4 pointer-events-none" />

  //       {/* Card */}
  //       <div className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
  //         {/* Top accent bar */}
  //         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />

  //         {/* Header */}
  //         <div className="text-center mb-8 mt-2">
  //           <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-4">
  //             <svg
  //               className="w-7 h-7 text-emerald-400"
  //               fill="none"
  //               stroke="currentColor"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  //               />
  //             </svg>
  //           </div>
  //           <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
  //             Create Account
  //           </h1>
  //           <p className="text-slate-400 text-sm">
  //             Register to file and track complaints
  //           </p>
  //         </div>

  //         {/* Form */}
  //         <form className="space-y-4">
  //           {/* Two-column row: Name + Phone */}
  //           <div className="grid grid-cols-2 gap-3">
  //             <div>
  //               <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
  //                 Full Name
  //               </label>
  //               <input
  //                 type="text"
  //                 placeholder="John Doe"
  //                 className="w-full px-4 h-11 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 focus:bg-white/10 transition duration-200 text-sm"
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
  //                 Phone
  //               </label>
  //               <input
  //                 type="text"
  //                 placeholder="+1 234 567"
  //                 className="w-full px-4 h-11 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 focus:bg-white/10 transition duration-200 text-sm"
  //               />
  //             </div>
  //           </div>

  //           {/* Address */}
  //           <div>
  //             <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
  //               Address
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="123 Main Street, City"
  //               className="w-full px-4 h-11 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 focus:bg-white/10 transition duration-200 text-sm"
  //             />
  //           </div>

  //           {/* Email */}
  //           <div>
  //             <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
  //               Email
  //             </label>
  //             <div className="relative">
  //               <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
  //                 <svg
  //                   className="w-4 h-4"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  //                   />
  //                 </svg>
  //               </span>
  //               <input
  //                 type="email"
  //                 placeholder="you@example.com"
  //                 className="w-full pl-10 pr-4 h-11 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 focus:bg-white/10 transition duration-200 text-sm"
  //               />
  //             </div>
  //           </div>

  //           {/* Password */}
  //           <div>
  //             <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
  //               Password
  //             </label>
  //             <div className="relative">
  //               <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
  //                 <svg
  //                   className="w-4 h-4"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  //                   />
  //                 </svg>
  //               </span>
  //               <input
  //                 type="password"
  //                 placeholder="Min. 8 characters"
  //                 className="w-full pl-10 pr-4 h-11 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 focus:bg-white/10 transition duration-200 text-sm"
  //               />
  //             </div>
  //           </div>

  //           {/* Submit Button */}
  //           <button
  //             type="submit"
  //             className="w-full h-12 mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98] transition-all duration-300 tracking-wide"
  //           >
  //             Create Account →
  //           </button>
  //         </form>

  //         {/* Divider */}
  //         <div className="flex items-center gap-3 my-5">
  //           <div className="flex-1 h-px bg-white/10" />
  //           <span className="text-slate-600 text-xs">or</span>
  //           <div className="flex-1 h-px bg-white/10" />
  //         </div>

  //         {/* Footer */}
  //         <p className="text-center text-sm text-slate-500">
  //           Already have an account?{" "}
  //           <span className="text-emerald-400 font-semibold cursor-pointer hover:text-emerald-300 hover:underline underline-offset-2 transition">
  //             Sign In
  //           </span>
  //         </p>
  //       </div>
  //     </div>
  //   );
}

export default Register;
