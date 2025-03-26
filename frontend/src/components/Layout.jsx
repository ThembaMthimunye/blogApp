import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/authContext";

const Layout = () => {
  const navigate = useNavigate();
  // const { authUser } = useAuthContext();
  const user=localStorage.getItem("user")
  useEffect(() => {
    if (user) {
      // navigate("/Home");
    }
  }, [user]);



  return (
    <div>
      <Navbar />
      <main className="flex justify-center w-screen mt-30">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
