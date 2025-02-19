import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/messages.css"; // ✅ Import success/error message styles

const SellerPostProperty = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const sellerId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    title: "",
    type: "Independent House",
    location: "",
    price: "",
    sqft: "",
    imageLink: "",
    documentLink: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting property:", formData); // ✅ Debug: Ensure correct data is sent
  
    if (!formData.title || !formData.type || !formData.location || !formData.price || !formData.sqft || !formData.imageLink || !formData.documentLink) {
      setErrorMessage("⚠️ All fields are required.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
  
    try {
      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5001/api/properties/create",
        { ...formData, seller: sellerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("✅ API Response:", response.data); // ✅ Debug: Check API response
      setSuccessMessage("✅ Property successfully posted! Pending admin approval.");
  
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/seller-dashboard");
      }, 2000);
    } catch (error) {
      console.error("❌ Property Upload Error:", error.response?.data || error.message);
      setErrorMessage(`⚠️ Error: ${error.response?.data?.message || "Server Error"}`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="seller-dashboard">
      <h1>📌 Post Your Property</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Property Title" onChange={handleChange} required />
        <select name="type" onChange={handleChange} required>
          <option value="Independent House">Independent House</option>
          <option value="Flat">Flat</option>
          <option value="Plot">Plot</option>
        </select>
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="sqft" placeholder="Square Feet" onChange={handleChange} required />
        <input type="text" name="imageLink" placeholder="Google Drive Image Link" onChange={handleChange} required />
        <input type="text" name="documentLink" placeholder="Google Drive Document Link" onChange={handleChange} required />
        <button type="submit">Submit for Approval</button>
      </form>
    </div>
  );
};

export default SellerPostProperty;