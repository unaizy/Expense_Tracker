import React, { useState } from 'react';

const TransactionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category.trim() || !formData.description.trim() || Number(formData.amount) <= 0) {
      return;
    }

    onSubmit({
      ...formData,
      category: formData.category.trim(),
      description: formData.description.trim(),
      amount: Number(formData.amount)
    });
    // Reset form
    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="transaction-form transaction-form-modern">
      <div className="form-heading">
        <div>
          <p className="eyebrow">Money movement</p>
          <h3>Add New Transaction</h3>
        </div>
        <span className={`form-type-badge ${formData.type}`}>{formData.type}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="type-switch" role="group" aria-label="Transaction type">
          <button
            type="button"
            className={formData.type === 'expense' ? 'selected expense' : ''}
            onClick={() => setFormData({ ...formData, type: 'expense' })}
          >
            Expense
          </button>
          <button
            type="button"
            className={formData.type === 'income' ? 'selected income' : ''}
            onClick={() => setFormData({ ...formData, type: 'income' })}
          >
            Income
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Food, Rent"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <div className="amount-input">
              <span>₹</span>
              <input
                id="amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this for?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-transaction" type="submit">
          Add {formData.type}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;