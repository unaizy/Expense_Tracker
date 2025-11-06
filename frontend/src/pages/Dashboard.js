import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryChart from '../components/SummaryChart';
import api from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch transactions');
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await api.post('/transactions', transactionData);
      setTransactions([response.data, ...transactions]);
    } catch (error) {
      setError('Failed to add transaction');
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (error) {
      setError('Failed to delete transaction');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
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
    </div>
  );
};

export default Dashboard;