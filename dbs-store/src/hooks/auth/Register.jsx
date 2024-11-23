import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Optional CSS file for styling
import { registerURL } from '../../components/assets/constants/Urls/Url';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayed_name: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    if (!formData.displayed_name || !formData.email || !formData.password) {
      setFormError('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(registerURL, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to the login page after successful registration
      } else {
        setFormError('Registration failed. Please try again.');
      }
    } catch (error) {
      //console.error('Error during registration:', error);
      setFormError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 text-center shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4">Register for FoutaLib</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              name="displayed_name"
              value={formData.displayed_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {formError && <p className="text-danger">{formError}</p>}

          <button type="submit" className="btn btn-success btn-block mb-3">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <button
          className="btn btn-secondary btn-block"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
