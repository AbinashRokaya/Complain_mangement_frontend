import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components.jsx/Header/Header";
import { Outlet } from "react-router-dom";
import Error from "./components.jsx/Error";
import Succrss from "./components.jsx/Succrss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Error />
      <Succrss />
      <Outlet />
    </>
  );
}

export default App;
