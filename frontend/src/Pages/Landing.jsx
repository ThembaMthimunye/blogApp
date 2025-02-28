import React, { useState } from "react";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { Button } from "@/components/ui/button";
const Landing = () => {
  const [view, setView] = useState(0);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {!view ? (
        <div className="flex flex-col w-96">
          <Login />
          <button className="mt-4 text-blue-600"  onClick={()=>setView(!view)}> Dont have an account ? Create account</button>
        </div>
      ) : (
        <div className="flex flex-col w-[100rem]">
          < CreateUser/>
          <button className="-mt-10 text-blue-600"  onClick={()=>setView(!view)}>Have an account ? Go to Login</button>
        </div>
      )}
    </div >
  );
};

export default Landing;
Landing;
