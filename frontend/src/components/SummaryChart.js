import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SummaryChart = ({ transactions }) => {
  // Process transactions data for the chart
  const processData = () => {
    const dates = [...new Set(transactions.map(t => 
      new Date(t.date).toLocaleDateString()
    ))].sort();

    const incomeData = dates.map(date => {
      return transactions
        .filter(t => new Date(t.date).toLocaleDateString() === date && t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
    });

    const expenseData = dates.map(date => {
      return transactions
        .filter(t => new Date(t.date).toLocaleDateString() === date && t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
    });

    return { dates, incomeData, expenseData };
  };

  const { dates, incomeData, expenseData } = processData();

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="summary-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default SummaryChart;