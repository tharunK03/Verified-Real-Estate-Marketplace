import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ Retrieve JWT token

  const [formData, setFormData] = useState({
    title: "",
    type: "Independent House",
    location: "",
    price: "",
    sqft: "",
  });

  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.type || !formData.location || !formData.price || !formData.sqft || !image || !document) {
      alert("All fields are required.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("image", image);
    formDataToSend.append("document", document);

    console.log("Uploading Form Data:", formDataToSend); // ✅ Debugging log

    try {
      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await axios.post("http://localhost:5001/api/properties/create", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Property posted successfully! Pending admin approval.");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ File Upload Error:", error.response?.data || error.message);
      alert(`Failed to post property: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="seller-dashboard">
      <h2>Post Your Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <select name="type" onChange={handleChange} required>
          <option value="Independent House">Independent House</option>
          <option value="Flat">Flat</option>
          <option value="Plot">Plot</option>
        </select>
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="sqft" placeholder="Square Feet" onChange={handleChange} required />
        <label>Upload Property Image:</label>
        <input type="file" name="image" accept="image/*" onChange={(e) => handleFileChange(e, setImage)} required />
        <label>Upload Document:</label>
        <input type="file" name="document" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, setDocument)} required />
        <button type="submit">Post Property</button>
      </form>
    </div>
  );
};

export default SellerDashboard;
