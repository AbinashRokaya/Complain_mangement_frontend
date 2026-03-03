import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const { loginStatus, loadingStatus } = useContext(LoginContext);

  useEffect(() => {
    if (loadingStatus) return; // ← Wait for localStorage to load first

    if (authentication && !loginStatus) {
      navigate("/login"); // Protected page but not logged in → go to login
    } else if (!authentication && loginStatus) {
      navigate("/home"); // Login page but already logged in → go to home
    }
  }, [loginStatus, loadingStatus, authentication, navigate]);

  if (loadingStatus) return <h1>Loading...</h1>; // ← Show loading until auth is known

  return <>{children}</>;
}
