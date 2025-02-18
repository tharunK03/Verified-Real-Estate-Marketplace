import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(""); // Stores selected role

  useEffect(() => {
    const userRole = localStorage.getItem("userRole"); // Get role from localStorage

    if (!userRole) {
      navigate("/login"); // Redirect to login if no role is found
    } else {
      redirectUser(userRole); // Redirect immediately if user is already logged in
    }
  }, [navigate]);

  // ✅ Redirect User Based on Role
  const redirectUser = (role) => {
    switch (role) {
      case "buyer":
        navigate("/buyer-dashboard");
        break;
      case "seller":
        navigate("/seller-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  // ✅ Handle Role Selection Manually
  const handleRoleSelection = () => {
    if (selectedRole) {
      localStorage.setItem("userRole", selectedRole); // Save role in localStorage
      redirectUser(selectedRole);
    } else {
      alert("Please select a role!");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Real Estate Portal</h1>
      <p>Select your role to continue:</p>

      <select onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="">-- Select Role --</option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRoleSelection}>Proceed</button>
    </div>
  );
};

export default Dashboard;
