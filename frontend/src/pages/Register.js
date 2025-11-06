import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      console.log('Registration response:', response);

      if (response.data) {
        // ✅ Registration successful → go to login page
        navigate('/login');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response from server. Please check if the backend server is running.');
      } else {
        setError('Error setting up the request: ' + error.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <button onClick={redirectToLogin} className="link-button">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
