import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userData, setUserdata] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errors, setError] = useState("");
  const [success, setSucess] = useState("");
  const [IsSuccess, setIsSucces] = useState(false);

  const login = (data) => {
    localStorage.setItem("userdata", JSON.stringify(data));
    localStorage.setItem("status", true);
    setLoginStatus(true);
    setUserdata(data);
  };
  const logout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("status");
    setLoginStatus(false);
    setUserdata(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userdata");
    const storeStatus = localStorage.getItem("status");

    if (storedUser && storeStatus) {
      setUserdata(JSON.parse(storedUser));
      setLoginStatus(true);
    }
    setLoadingStatus(false);
  }, []);
  // function handlelogout() {
  //   console.log("Hello, world!");
  // }

  // setTimeout(handlelogout, 10000);

  return (
    <LoginContext.Provider
      value={{
        login,
        userData,
        logout,
        loginStatus,
        loadingStatus,
        setIsError,
        isError,
        setError,
        errors,
        success,
        setIsSucces,
        setSucess,
        IsSuccess,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
