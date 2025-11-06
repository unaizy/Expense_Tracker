import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <div className="transactions">
        {transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className={`transaction-item ${transaction.type}`}
            >
              <div className="transaction-info">
                <h4>{transaction.description}</h4>
                <p>{transaction.category}</p>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <div className="transaction-amount">
                <span>
                  {transaction.type === 'expense' ? '-' : '+'}₹
                  {transaction.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onDelete(transaction._id)}
                  className="delete-btn"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;