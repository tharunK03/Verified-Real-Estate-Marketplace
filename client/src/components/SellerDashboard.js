import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerPostProperty = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    type: "Independent House",
    location: "",
    price: "",
    sqft: "",
    image: null,
    document: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.type || !formData.location || !formData.price || !formData.sqft || !formData.image || !formData.document) {
      alert("All fields are required.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5001/api/properties/create", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Property submitted! Pending admin approval.");
      navigate("/seller-dashboard"); // ✅ Now seller can access the dashboard
    } catch (error) {
      console.error("❌ Property Upload Error:", error.response?.data || error.message);
      alert("Error posting property. Try again.");
    }
  };

  return (
    <div className="seller-dashboard">
      <h1>📌 Post Your Property</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Property Title" onChange={handleChange} required />
        <select name="type" onChange={handleChange} required>
          <option value="">Select Property Type</option>
          <option value="Independent House">Independent House</option>
          <option value="Flat">Flat</option>
          <option value="Plot">Plot</option>
        </select>
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="sqft" placeholder="Square Feet" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} required />
        <input type="file" name="document" onChange={handleChange} required />
        <button type="submit">Submit for Approval</button>
      </form>
    </div>
  );
};

export default SellerPostProperty;