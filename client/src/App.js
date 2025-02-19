import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Role selection page
import SellerPostProperty from "./components/SellerPostProperty"; // Seller first posts details
import SellerDashboard from "./components/SellerDashboard";
import BuyerDashboard from "./components/BuyerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Register from "./components/Register";

/**
 * 🔒 Private Route - Ensures the user is authenticated before accessing a page.
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Only accessible if logged in) */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/buyer-dashboard" element={<PrivateRoute><BuyerDashboard /></PrivateRoute>} />
        <Route path="/seller-post-property" element={<PrivateRoute><SellerPostProperty /></PrivateRoute>} />
        <Route path="/seller-dashboard" element={<PrivateRoute><SellerDashboard /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

        {/* Redirect to Login if Route Not Found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;