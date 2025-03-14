import { React, useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function submitHandle(e) {
    e.preventDefault();
    console.log(user)
    try {
      const response = await login(user); 
      if (response) {
        // token=response.data.token
        sessionStorage.setItem("user", response);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
        navigate("/Home"); // Navigate to home page on success
      } else {
        console.log("Login response:", response);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form onSubmit={submitHandle} className="">
        <div className="flex flex-col space-y-4">
          <button className="btn btn-secondary">test</button>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            maxLength={50}
          />

          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            maxLength={50}
          />

          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
