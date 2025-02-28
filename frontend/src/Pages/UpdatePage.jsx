import React from "react";
import icon from "../assets/Pictures/bg.jpg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {updateuser } from "@/api";

const UpdatePage = () => {
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
    const {id}=useParams()
    const navigate=useNavigate()

    // const navigate = useNavigate();
    async function submitHandle(e) {
      e.preventDefault();
      let response = await updateuser(id,user);
      if (response) {
        navigate("/Home");
        console.log(response);
      } else {
        alert("update failed");
      }
    }
  return (
    <form onSubmit={submitHandle}>
          <div className="w-screen min-h-screen items-center flex  justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <img src={icon} className="w-40 h-40 rounded-full shadow-md" alt="Profile" />
            <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition">Upload</button>
          </div>
          
          <div className="flex flex-col space-y-4 flex-1">
            <input 
              type="text" 
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder=" Name"
              onChange={(e)=>setUser({...user,name:e.target.value})}
            />
            <input 
              type="text" 
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Email "
              onChange={(e)=>setUser({...user,email:e.target.value})}
            />
            <input 
              type="text" 
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Password"
              onChange={(e)=>setUser({...user,password:e.target.value})}
            />
          </div>
        </div>
        
        <button 
            type="submit"
          className="mt-10 w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition">
          Update
        </button>
      </div>
    </div>
    </form>
  
  );
};

export default UpdatePage;
