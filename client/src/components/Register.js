import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/register';



const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
      <select name="role" onChange={handleChange} className="w-full p-2 mb-4 border rounded">
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="renter">Renter</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default Register;
