import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    // Go back to login page
    navigate("/login", { replace: true });
  };

  return (
    <header className="header">
      <div className="header-content">
        <h2>Expense Tracker</h2>

        <button
          type="button"
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;