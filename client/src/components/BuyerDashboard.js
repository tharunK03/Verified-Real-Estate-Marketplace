import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/buyerDashboard.css"; // Ensure CSS exists

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/properties/verified"); // ✅ Ensure route matches backend
        setProperties(response.data);
      } catch (err) {
        console.error("❌ Error fetching properties:", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="buyer-dashboard">
      <h1>🏡 Available Properties</h1>
      {properties.length === 0 ? (
        <p className="no-properties">🚫 No properties to display</p>
      ) : (
        <div className="properties-container">
          {properties.map((property) => (
            <div key={property._id} className="property-card">
              <h3>{property.title}</h3>
              <p><strong>Type:</strong> {property.type}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> ${property.price}</p>
              <p><strong>Size:</strong> {property.sqft} sqft</p>
              <img src={`http://localhost:5001/${property.image}`} alt="Property" className="property-img"/>
              <a href={`http://localhost:5001/${property.document}`} target="_blank" rel="noopener noreferrer" className="view-doc">📄 View Document</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;