import React from 'react';

const DestinationResults = ({ destinations }) => (
  <div style={{ marginTop: "20px" }}>
    <h2>Recommended Destinations</h2>
    {destinations.map(dest => (
      <div
        key={dest.name}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
        }}
      >
        <h3>{dest.name}</h3>
        <p>Avg Price: €{dest.avgPrice} — CO₂: {dest.co2}kg</p>
        <p>Interests Match Score: {dest.matchScore}</p>
      </div>
    ))}
  </div>
);

export default DestinationResults;