import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/properties";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/pending`).then((response) => {
      setProperties(response.data);
    });
  }, []);

  const handleApprove = async (id) => {
    await axios.put(`${API_URL}/approve/${id}`);
    alert("Property approved and sent for agent verification.");
    setProperties(properties.filter((prop) => prop._id !== id));
  };

  const handleReject = async (id) => {
    await axios.delete(`${API_URL}/reject/${id}`);
    alert("Property rejected.");
    setProperties(properties.filter((prop) => prop._id !== id));
  };

  return (
    <div>
      <h2>Pending Property Approvals</h2>
      {properties.map((property) => (
        <div key={property._id}>
          <p>{property.title} - {property.location} - ${property.price}</p>
          <button onClick={() => handleApprove(property._id)}>Approve</button>
          <button onClick={() => handleReject(property._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
