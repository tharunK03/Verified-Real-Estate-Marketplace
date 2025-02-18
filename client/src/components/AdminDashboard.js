import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/properties/pending');
      setProperties(data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    }
  };

  const handleApproval = async (propertyId, status) => {
    try {
      await axios.put(`http://localhost:5001/api/properties/${propertyId}/approve`, { status });
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error('Failed to update property status:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard - Pending Properties</h1>
      {properties.length === 0 ? (
        <p>No pending properties.</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property._id}>
              {property.title} - {property.location} - ₹{property.price}
              <button onClick={() => handleApproval(property._id, 'approved')}>Approve</button>
              <button onClick={() => handleApproval(property._id, 'rejected')}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
