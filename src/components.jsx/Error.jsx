import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";

function Error() {
  const { setIsError, setError, errors, isError } = useContext(LoginContext);
  setTimeout(() => {
    setIsError(false);
    setError("");
  }, 5000);

  return (
    <div
      className={`fixed top-18 left-0 right-0 z-50 bg-red-600 p-4 text-white transition-all duration-700 ease-in-out
    ${isError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
  `}
    >
      {Array.isArray(errors)
        ? errors.map((err, index) => <p key={index}>{err.msg}</p>)
        : typeof errors === "string"
          ? errors
          : null}
    </div>
  );
}

export default Error;
