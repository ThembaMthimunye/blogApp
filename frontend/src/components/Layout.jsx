import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Layout = () => {
  let user=sessionStorage.getItem('user')
  const navigate=useNavigate()

  useEffect(()=>{
    if(!user){
      navigate('/')
    }
  },
  [user])

  return (
    <div>
      <Navbar />

      <main className="flex justify-center w-screen mt-30">
      <Outlet/>
      </main>
      
    </div>
  );
};

export default Layout;
