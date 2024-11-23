// AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../assets/constants/Urls/Url';

const AddUser = () => {
  const [userData, setUserData] = useState({
    displayed_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(addUser, userData);
      setSuccess('User added successfully!');
      setUserData({ username: '', email: '', password: '' });
      setTimeout(() => navigate('/admins'), 2000); // Navigate back after success
    } catch (err) {
      setError('Failed to add user. Try again.');
    }
  };

  return (
    <div className="add-user">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="displayed_name">Full Name:</label>
          <input
            type="text"
            id="displayed_name"
            name="displayed_name"
            value={userData.displayed_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
      {error && <p className="error">{"Newwork Error"}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AddUser;
