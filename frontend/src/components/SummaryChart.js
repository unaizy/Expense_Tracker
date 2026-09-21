import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SummaryChart = ({ transactions }) => {
  const categories = [...new Set(transactions.map(transaction => transaction.category))].sort();
  const incomeData = categories.map(category => transactions
    .filter(transaction => transaction.category === category && transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0));
  const expenseData = categories.map(category => transactions
    .filter(transaction => transaction.category === category && transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0));

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: '#35d39a',
        borderRadius: 6,
        maxBarThickness: 28,
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: '#ff7183',
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#b8bfd4', usePointStyle: true, padding: 18 },
      },
      title: {
        display: true,
        text: 'Income and expenses by category',
        color: '#f4f5fb',
        align: 'start',
        font: { size: 16, weight: '600' },
      },
      tooltip: { callbacks: { label: context => ` ₹${context.parsed.y.toLocaleString()}` } },
    },
    scales: {
      x: { ticks: { color: '#8f96ad' }, grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { color: '#8f96ad', callback: value => `₹${value.toLocaleString()}` },
        grid: { color: 'rgba(143, 150, 173, 0.14)' },
      },
    },
  };

  return (
    <div className="summary-chart">
      <div className="chart-heading">
        <p className="eyebrow">Spending map</p>
        <span>{transactions.length} {transactions.length === 1 ? 'entry' : 'entries'}</span>
      </div>
      {categories.length === 0 ? (
        <div className="chart-empty">Add a transaction to see your spending map.</div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default SummaryChart;