import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../pages/styles/reports.css";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setError("Failed to load reports.");
      setLoading(false);
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = income - expense;

  // Calculate expenses by category
  const categoryTotals = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const category = t.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + Number(t.amount || 0);
    });

  const categories = Object.entries(categoryTotals);

  if (loading) {
    return (
      <div className="reports-page">
        <h1>📊 Reports</h1>
        <p className="reports-loading">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reports-page">
        <h1>📊 Reports</h1>
        <p className="reports-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="reports-page">
      {/* Header */}
      <div className="reports-header">
        <div>
          <h1>📊 Reports</h1>
          <p>Analyze your income and expenses</p>
        </div>

        <Link to="/dashboard" className="back-button">
          ← Dashboard
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="report-cards">
        <div className="report-card income-card">
          <span>💰</span>
          <div>
            <h3>Total Income</h3>
            <p>₹{income.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <div className="report-card expense-card">
          <span>💸</span>
          <div>
            <h3>Total Expenses</h3>
            <p>₹{expense.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <div className="report-card balance-card">
          <span>💳</span>
          <div>
            <h3>Balance</h3>
            <p>₹{balance.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>

      {/* Income vs Expense */}
      <div className="report-section">
        <h2>Income vs Expenses</h2>

        <div className="comparison-container">
          <div className="comparison-item">
            <div className="comparison-label">
              <span>Income</span>
              <strong>₹{income.toLocaleString("en-IN")}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="income-progress"
                style={{
                  width: `${
                    income + expense === 0
                      ? 0
                      : (income / (income + expense)) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="comparison-item">
            <div className="comparison-label">
              <span>Expenses</span>
              <strong>₹{expense.toLocaleString("en-IN")}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="expense-progress"
                style={{
                  width: `${
                    income + expense === 0
                      ? 0
                      : (expense / (income + expense)) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="report-section">
        <h2>🏷️ Expense by Category</h2>

        {categories.length === 0 ? (
          <p className="empty-message">No expense data available.</p>
        ) : (
          <div className="category-list">
            {categories
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => {
                const percentage =
                  expense === 0 ? 0 : (amount / expense) * 100;

                return (
                  <div className="category-row" key={category}>
                    <div className="category-info">
                      <span>{category}</span>
                      <strong>
                        ₹{amount.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="category-bar">
                      <div
                        className="category-progress"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    <small>{percentage.toFixed(1)}%</small>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="report-section">
        <h2>🧾 Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p className="empty-message">No transactions available.</p>
        ) : (
          <div className="transaction-table">
            <div className="table-header">
              <span>Description</span>
              <span>Category</span>
              <span>Type</span>
              <span>Amount</span>
            </div>

            {transactions.slice(0, 10).map((transaction) => (
              <div className="table-row" key={transaction._id}>
                <span>{transaction.description || "No description"}</span>

                <span>{transaction.category || "Other"}</span>

                <span
                  className={
                    transaction.type === "income"
                      ? "income-text"
                      : "expense-text"
                  }
                >
                  {transaction.type}
                </span>

                <span
                  className={
                    transaction.type === "income"
                      ? "income-text"
                      : "expense-text"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}₹
                  {Number(transaction.amount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;