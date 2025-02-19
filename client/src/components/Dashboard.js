import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Ensure the CSS file exists

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  // ✅ Ensure user is logged in before accessing the dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  // ✅ Handle role selection and navigation
  const handleRoleSelection = () => {
    if (!selectedRole) {
      alert("⚠️ Please select a role to proceed!");
      return;
    }

    localStorage.setItem("userRole", selectedRole);

    if (selectedRole === "buyer") {
      navigate("/buyer-dashboard"); // ✅ Redirect to Buyer Dashboard
    } else if (selectedRole === "seller") {
      navigate("/seller-post-property"); // ✅ Seller must post property first
    } else if (selectedRole === "renter") {
      navigate("/renter-dashboard"); // ✅ Redirect to Renter Dashboard
    }
  };

  return (
    <div className="dashboard-container">
      <h1>🏡 Welcome to the Real Estate Portal</h1>
      <p className="dashboard-subtitle">Select your role to continue:</p>

      <div className="role-selection">
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">-- Select Role --</option>
          <option value="buyer">Buyer</option>
          <option value="renter">Renter</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      <button className="proceed-btn" onClick={handleRoleSelection}>Proceed</button>
    </div>
  );
};

export default Dashboard;