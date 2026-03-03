import React, { useContext } from "react";
import { isSession } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Succrss() {
  const { success, setIsSucces, setSucess, IsSuccess } =
    useContext(LoginContext);
  setTimeout(() => {
    setIsSucces(false);
    setSucess("");
  }, 5000);

  return (
    <div
      className={`fixed top-18 left-0 right-0 z-50 bg-green-600 p-4 transition-all duration-700 ease-in-out
          ${IsSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
          
        `}
    >
      {success}
    </div>
  );
}

export default Succrss;
