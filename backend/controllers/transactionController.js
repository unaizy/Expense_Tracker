
const Transaction = require('../models/Transaction');

// @desc    Get user transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      date: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      category,
      amount,
      description,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check user ownership
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Delete the transaction
    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};

