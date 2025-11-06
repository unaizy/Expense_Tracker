import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const token = localStorage.getItem('userToken');

  return (
    <Router>
      <Routes>
        {/* Default route → Register */}
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route for dashboard */}
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
