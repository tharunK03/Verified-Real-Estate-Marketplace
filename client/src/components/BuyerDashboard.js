import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Ensure CSS styles exist

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    localStorage.setItem("userRole", role);

    // Redirect based on selected role
    if (role === "buyer") {
      navigate("/buyer-dashboard");
    } else if (role === "seller") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Select Your Role</h2>
      <div className="role-selection">
        <button className="role-btn buyer" onClick={() => handleSelectRole("buyer")}>
          Buyer
        </button>
        <button className="role-btn seller" onClick={() => handleSelectRole("seller")}>
          Seller
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
