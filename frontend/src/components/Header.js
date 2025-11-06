import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <img src="/logo.svg" alt="Expense Tracker" className="logo" />
          <Link to="/" className="brand-title">Expense Tracker</Link>
        </div>

        <nav className="main-nav">
          {!isAuthenticated && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
