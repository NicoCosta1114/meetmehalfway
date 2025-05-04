// src/App.js
import React, { useState } from 'react';
import UserForm from './components/UserForm';
import { destinations } from './data/destinations';
import { matchDestinations } from './utils/matchAlgorithm';

function App() {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);

  const handleAddUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);

    console.log('🟡 Sending data to n8n...', user);

    fetch('http://0.0.0.0:5678/webhook-test/49e478f9-ce89-4773-9156-0421e7f766ae', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        console.log('📦 Response received:', response);
        if (!response.ok) {
          console.error('❌ Error sending to n8n:', response.statusText);
        } else {
          console.log('✅ User sent to n8n');
        }
      })
      .catch(error => {
        console.error('❌ Connection error with n8n:', error);
      });

    if (updatedUsers.length >= 2) {
      const matched = matchDestinations(updatedUsers, destinations);
      setResults(matched);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Find the perfect destination 🧳</h1>
      <UserForm onSubmit={handleAddUser} />

      {users.length > 0 && (
        <div>
          <h2>Users added</h2>
          <ul>
            {users.map((u, index) => (
              <li key={index}>
                <strong>{u.name}</strong> from <strong>{u.city}</strong>, budget: {u.budget}€<br />
                Interests: {u.interests.join(', ')}<br />
                {u.nightlife && 'Enjoys nightlife · '}
                {u.environment && `Prefers ${u.environment} · `}
                {u.explorer && 'Wants to discover new experiences · '}
                {u.favorites && `Favorite shows/movies: ${u.favorites}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2>Recommended destinations ✈️</h2>
          <ul>
            {results.map((dest, index) => (
              <li key={index} style={{ marginBottom: '12px' }}>
                <strong>{dest.name}</strong><br />
                Average price: {dest.avgPrice}€ — CO₂: {dest.co2}kg<br />
                Score: {dest.matchScore}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
