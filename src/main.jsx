import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components.jsx/Home.jsx";
import About from "./components.jsx/About.jsx";
import Contact from "./components.jsx/Contact.jsx";
import Register from "./components.jsx/Register.jsx";
import Login from "./components.jsx/Login.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import Complaint from "./components.jsx/Complaint.jsx";
import ComplainList from "./components.jsx/ComplainList.jsx";
import Admin from "./components.jsx/Admin.jsx";
import SuperAdmin from "./components.jsx/SuperAdmin.jsx";
import AuthLayout from "./components.jsx/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",

        element: (
          <AuthLayout authentication={false}>
            <Home />,
          </AuthLayout>
        ),
      },
      {
        path: "/about",
        element: (
          <AuthLayout authentication={false}>
            <About />,
          </AuthLayout>
        ),
      },
      {
        path: "/contact",
        element: (
          <AuthLayout authentication={false}>
            <Contact />,
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />,
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/complaint",
        element: (
          <AuthLayout authentication={false}>
            <Complaint />,
          </AuthLayout>
        ),
      },
      {
        path: "/complaint_List",
        element: (
          <AuthLayout authentication={false}>
            <ComplainList />,
          </AuthLayout>
        ),
      },
      {
        path: "/admin",
        element: (
          <AuthLayout authentication={false}>
            <Admin />,
          </AuthLayout>
        ),
      },
      {
        path: "/superAdmin",
        element: (
          <AuthLayout authentication={false}>
            <SuperAdmin />,
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>,
);
