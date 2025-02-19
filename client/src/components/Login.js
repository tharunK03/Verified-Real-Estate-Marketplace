import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/auth.css"; // Ensure you have this CSS file for styling

const API_URL = "http://localhost:5001/api/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });

      // ✅ Store user token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      alert("Login successful!");
      navigate("/dashboard"); // ✅ Redirect to Dashboard after login
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <div className="auth-footer">
        Don't have an account? <a href="/register">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
