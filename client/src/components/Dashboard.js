import React from 'react';

const Dashboard = ({ role }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the {role} Dashboard</h1>
      <p>This is a role-based dashboard. You are logged in as: <strong>{role}</strong>.</p>
    </div>
  );
};

export default Dashboard;
