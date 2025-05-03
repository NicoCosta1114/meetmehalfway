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

    console.log('🟡 Enviando datos a n8n...', user);

    fetch('http://0.0.0.0:5678/webhook-test/49e478f9-ce89-4773-9156-0421e7f766ae', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        console.log('📦 Respuesta recibida:', response);
        if (!response.ok) {
          console.error('❌ Error al enviar a n8n:', response.statusText);
        } else {
          console.log('✅ Usuario enviado a n8n');
        }
      })
      .catch(error => {
        console.error('❌ Error de conexión con n8n:', error);
      });

    if (updatedUsers.length >= 2) {
      const matched = matchDestinations(updatedUsers, destinations);
      setResults(matched);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Encuentra el destino perfecto 🧳</h1>
      <UserForm onSubmit={handleAddUser} />

      {users.length > 0 && (
        <div>
          <h2>Usuarios añadidos</h2>
          <ul>
            {users.map((u, index) => (
              <li key={index}>
                <strong>{u.name}</strong> desde <strong>{u.city}</strong>, presupuesto: {u.budget}€<br />
                Intereses: {u.interests.join(', ')}<br />
                {u.nightlife && 'Le gusta la vida nocturna · '}
                {u.environment && `Prefiere ${u.environment} · `}
                {u.explorer && 'Quiere descubrir nuevas experiencias · '}
                {u.favorites && `Series/pelis favoritas: ${u.favorites}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2>Destinos recomendados ✈️</h2>
          <ul>
            {results.map((dest, index) => (
              <li key={index} style={{ marginBottom: '12px' }}>
                <strong>{dest.name}</strong><br />
                Precio medio: {dest.avgPrice}€ — CO₂: {dest.co2}kg<br />
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
