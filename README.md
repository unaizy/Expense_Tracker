# 💰 Personal Expense Tracker

A full-stack personal finance management application built using the **MERN stack**.

The application allows users to securely manage their income and expenses, view their financial balance, analyze transactions, and manage their account through an easy-to-use dashboard.

---

## 🚀 Features

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing using bcrypt
- User-specific data access
- Change password functionality

### 💰 Transaction Management
- Add income transactions
- Add expense transactions
- View transaction history
- Delete transactions
- Automatic income, expense, and balance calculations

### 📊 Dashboard
- Total income
- Total expenses
- Current balance
- Transaction history
- Financial summary charts

### 📈 Reports
- Expense analysis
- Income and expense summaries
- Category-based spending information
- Recent transaction overview

### ⚙️ Settings
- Update profile name
- Update email address
- Change password
- Logout functionality

### 💾 Data Persistence
- MongoDB database
- Persistent user accounts
- Persistent transaction data
- Data remains available after logout and login

---

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- Axios
- Chart.js
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- REST API

### Database

- MongoDB
- Mongoose

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Compass

---

## 📂 Project Structure

```text
expenseTracker/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md