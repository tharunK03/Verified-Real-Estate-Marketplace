import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('userRole', data.role);  // Store the user role
      localStorage.setItem('token', data.token);    // Store the JWT token

      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error); // Log error for debugging
      alert(error.response?.data?.error || 'Login failed. Check credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
