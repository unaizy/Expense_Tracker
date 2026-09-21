import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import SummaryChart from "../components/SummaryChart";
import api from "../services/api";
import "../pages/styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch transactions");
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await api.post("/transactions", transactionData);

      setTransactions((prevTransactions) => [
        response.data,
        ...prevTransactions,
      ]);

      triggerToast("✅ Transaction Added!");
    } catch (error) {
      triggerToast("❌ Failed to Add Transaction");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);

      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t._id !== id)
      );

      triggerToast("🗑️ Transaction Deleted!");
    } catch (error) {
      triggerToast("❌ Failed to Delete");
    }
  };

  const handleLogout = () => {
    // Remove login information
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  const triggerToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (error) {
    return <div className="error-screen">{error}</div>;
  }

  // Summary calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = income - expense;

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2 className="logo">💰 Money Manager</h2>

        <nav className="nav-links">
          <a className="active">📊 Dashboard</a>

          <Link to="/add-transaction">
            ➕ Add Transaction
          </Link>

          <Link to="/reports">
            📄 Reports
          </Link>

          <Link to="/settings">
            ⚙️ Settings
          </Link>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            🚪 Logout
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-bar">
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h1>Dashboard</h1>
        </header>

        {toast && <div className="toast">{toast}</div>}

        {/* SUMMARY CARDS */}
        <div className="summary-cards">
          <div className="card income">
            <h3>Income</h3>
            <p>₹{income}</p>
          </div>

          <div className="card expense">
            <h3>Expense</h3>
            <p>₹{expense}</p>
          </div>

          <div className="card balance">
            <h3>Balance</h3>
            <p>₹{balance}</p>
          </div>
        </div>

        {/* DASHBOARD CONTENT */}
        <div className="dashboard-content">
          <div className="left-panel">
            <TransactionForm onSubmit={addTransaction} />

            <SummaryChart transactions={transactions} />
          </div>

          <div className="right-panel">
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          © {new Date().getFullYear()} Money Manager — All Rights Reserved
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;