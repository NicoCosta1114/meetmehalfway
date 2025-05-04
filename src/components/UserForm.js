import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [user, setUser] = useState({
    name: '',
    city: '',
    budget: '',
    interests: [],
    nightlife: false,
    environment: '',
    explorer: false,
    favorites: ''
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setUser({ ...user, [name]: finalValue });
  };

  const handleInterestToggle = interest => {
    const updated = user.interests.includes(interest)
      ? user.interests.filter(i => i !== interest)
      : [...user.interests, interest];
    setUser({ ...user, interests: updated });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!user.name || !user.city || !user.budget) return alert("Please complete all fields");
    onSubmit(user);
    setUser({
      name: '',
      city: '',
      budget: '',
      interests: [],
      nightlife: false,
      environment: '',
      explorer: false,
      favorites: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        name="name"
        placeholder="Your name"
        value={user.name}
        onChange={handleChange}
        style={{ marginRight: '10px' }}
      />
      <input
        name="city"
        placeholder="Your city"
        value={user.city}
        onChange={handleChange}
        style={{ marginRight: '10px' }}
      />
      <input
        name="budget"
        type="number"
        placeholder="Max budget (€)"
        value={user.budget}
        onChange={handleChange}
        style={{ marginRight: '10px' }}
      />

      <div style={{ margin: '10px 0' }}>
        {['Food', 'Nature', 'Culture'].map(tag => (
          <button
            key={tag}
            type="button"
            style={{
              margin: "4px",
              background: user.interests.includes(tag) ? "#90ee90" : "#eee",
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={() => handleInterestToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <label>
        <input
          type="checkbox"
          name="nightlife"
          checked={user.nightlife}
          onChange={handleChange}
        />
        I enjoy nightlife
      </label>

      <br />

      <label>
        Preferred environment:
        <select
          name="environment"
          value={user.environment}
          onChange={handleChange}
          style={{ marginLeft: '10px' }}
        >
          <option value="">-- Select --</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
        </select>
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          name="explorer"
          checked={user.explorer}
          onChange={handleChange}
        />
        I want to discover new experiences
      </label>

      <br />

      <input
        name="favorites"
        placeholder="Favorite movies or series"
        value={user.favorites}
        onChange={handleChange}
        style={{ marginTop: '10px', width: '100%' }}
      />

      <br />
      <button type="submit" style={{ marginTop: '10px' }}>Add User</button>
    </form>
  );
};

export default UserForm;
