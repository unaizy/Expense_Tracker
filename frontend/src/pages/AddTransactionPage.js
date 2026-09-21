import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import api from "../services/api";
import "./styles/dashboard.css";

const AddTransactionPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const addTransaction = async (transactionData) => {
    try {
      await api.post("/transactions", transactionData);
      navigate("/dashboard");
    } catch (requestError) {
      setError("Could not save this transaction. Please try again.");
    }
  };

  return (
    <div className="app-layout add-page-layout">
      <main className="main-content add-page-content">
        <button className="back-link" onClick={() => navigate("/dashboard")}>
          ← Back to dashboard
        </button>
        <div className="add-page-intro">
          <p className="eyebrow">Keep your records current</p>
          <h1>Capture a transaction</h1>
          <p>Small entries add up. Log the details now and your dashboard will do the sorting for you.</p>
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="add-page-form">
          <TransactionForm onSubmit={addTransaction} />
        </div>
      </main>
    </div>
  );
};

export default AddTransactionPage;
