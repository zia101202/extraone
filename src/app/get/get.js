"use client"
import { useState, useEffect } from 'react';

export default function Get() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  // Function to add a user by making a POST request
  const addUser = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (res.ok) {
      // Clear input fields after submission
      setName('');
      setEmail('');
      // Fetch the updated list of users after adding
      fetchUsers();
    } else {
      alert(data.message); // Show error message if validation fails
    }
  };

  // Function to fetch users
  const fetchUsers = async () => {
    try {const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);} catch (error) {
        console.error('Error fetching users:', error);
      }
    
  };

  // Fetch users when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);


  

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add a New User</h1>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
