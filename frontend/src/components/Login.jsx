import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { login } from "../api"; // Ensure this import is correct
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function submitHandle(e) {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await login(user);

      if (response?.data?.success) {
        console.log("Login successful:", response.data);
        const { token, data } = response.data;

        // Store user data securely (avoid sensitive info)
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", token);
        // sessionStorage.setItem("token", token);

        // Set default authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Redirect after successful login
        navigate("/Home");
      } else {
        throw new Error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

      <form onSubmit={submitHandle}>
        <div className="flex flex-col space-y-4">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            maxLength={50}
          />

          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            maxLength={50}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;


