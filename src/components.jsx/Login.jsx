import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Login() {
  const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [email, setEmail] = useState("");
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

  const handlelogin = (e) => {
    e.preventDefault();
    if (!name || !password) return;

    // console.log(name, password);

    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
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
        setSucess("Successfully login");

        login(data);
        nagavitor("/home");
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        if (err.detail && err.detail.length > 0) {
          setError(err.detail);
        } else {
          setError("Login failed");
        }
      });
  };
  return (
    <form
      action="#"
      onSubmit={handlelogin}
      className=" min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-9 w-full max-w-lg shadow-2xl">
        <div className="flex justify-center flex-col items-center mb-8 mt-4 ">
          <h1 className="text-white text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to your Yatayat Gunaso account
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
              // className="bg-slate-200 h-10 rounded-lg text-md p-2 border-2 border-slate-400"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mb-6 ">
            <label
              htmlFor=""
              className="text-xs font-semibold tracking-widest text-gray-400 uppercase "
            >
              Password
            </label>
            <input
              type="password"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm outline-none cursor-pointer focus:border-amber-400 transition-colors"
              // className="bg-slate-200 h-10 rounded-lg text-md p-2 border-2 border-slate-400"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className=" flex justify-center items-center mt-4 ">
            <button
              // className="bg-green-500 w-md rounded-md h-10 hover:bg-green-400"
              className="w-md px-7 py-3 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm rounded-lg transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 flex justify-center item">
            <p className="text-gray-500 text-sm mt-1">
              Don't have an account?{" "}
            </p>
            <Link
              to="/register"
              className="text-red-600 px-2 hover:text-red-500 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
