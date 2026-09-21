import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Settings = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Get current user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");

        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await api.put("/auth/profile", {
        name,
        email,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update profile"
      );
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setMessage(response.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to change password"
      );
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        Loading settings...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1>Settings</h1>

      {message && (
        <div
          style={{
            background: "#1f7a4d",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#8b2e2e",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {/* PROFILE SETTINGS */}

      <div
        style={{
          background: "#1e1e1e",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}
      >
        <h2>👤 Profile</h2>

        <form onSubmit={handleProfileUpdate}>
          <div style={{ marginBottom: "15px" }}>
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#2b2b2b",
                color: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#2b2b2b",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* CHANGE PASSWORD */}

      <div
        style={{
          background: "#1e1e1e",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}
      >
        <h2>🔒 Change Password</h2>

        <form onSubmit={handlePasswordChange}>
          <div style={{ marginBottom: "15px" }}>
            <label>Current Password</label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#2b2b2b",
                color: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>New Password</label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#2b2b2b",
                color: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Confirm New Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px",
                border: "1px solid #555",
                background: "#2b2b2b",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Change Password
          </button>
        </form>
      </div>

      {/* LOGOUT */}

      <div
        style={{
          background: "#1e1e1e",
          padding: "25px",
          borderRadius: "12px",
        }}
      >
        <h2>🚪 Account</h2>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            background: "#c0392b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "20px",
          padding: "10px 18px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default Settings;