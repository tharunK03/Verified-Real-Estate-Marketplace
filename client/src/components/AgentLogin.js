import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/properties";

const AgentDashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/agent-pending`).then((response) => {
      setProperties(response.data);
    });
  }, []);

  const handleVerify = async (id) => {
    await axios.put(`${API_URL}/verify/${id}`);
    alert("Property verified by agent.");
    setProperties(properties.filter((prop) => prop._id !== id));
  };

  return (
    <div>
      <h2>Properties Pending Agent Verification</h2>
      {properties.map((property) => (
        <div key={property._id}>
          <p>{property.title} - {property.location} - ${property.price}</p>
          <button onClick={() => handleVerify(property._id)}>Verify</button>
        </div>
      ))}
    </div>
  );
};

export default AgentDashboard;
