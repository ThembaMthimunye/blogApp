import { React, useState } from "react";
import { createuser } from "../api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import loginImage from "../assets/Pictures/loginImage.jpg";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate=useNavigate()

  function goto(){
    navigate('/')
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function submitHandle(e) {
    e.preventDefault();
    let response = await createuser(user);
    if (response) {
      alert("User successfully created");
     navigate('/Home')
    } else {
      alert("User could not be created");
    }
    console.log(response);
  }

  return (
    <div className=" flex items-center justify-center  p-4">
      <div className="bg-white  rounded-2xl p-6 w-full max-w-md w-[100rem]">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={submitHandle} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <label htmlFor="name" className="font-medium">Name</label>
            <Input
              type="text"
              id="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
              placeholder="Enter your name"
              maxLength={15}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="email" className="font-medium">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              maxLength={30}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="password" className="font-medium">Password</label>
            <Input
              type="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              required
              maxLength={15}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <Button 
              type="submit" 
              className="bg-black text-white py-3 rounded-lg font-semibold  transition">
              Create Account
            </Button>
          </div>
          <div>
            
          </div>
          
        </form>

      </div>
    </div>
  );
};

export default CreateUser;
