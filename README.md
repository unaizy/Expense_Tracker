# 💰 Expense Tracker

A full-stack **Expense Tracker web application** built using the MERN stack. The application allows users to securely manage their income and expenses, view financial summaries, and keep their transaction data stored in MongoDB.

## 🌐 Live Demo

🚀 **[Open Expense Tracker](https://expense-tracker-frontend-kxmy.onrender.com)**

The application is deployed and available online.


## 📂 GitHub Repository

https://github.com/unaizy/Expense_Tracker

## ✨ Features

* 🔐 User registration and login
* 🔑 JWT-based authentication
* 💰 Add income and expense transactions
* 🗑️ Delete transactions
* 📋 View transaction history
* 📊 Income, expense, and balance summaries
* 📈 Financial summary chart
* 💾 Persistent data storage with MongoDB
* 👤 User-specific transactions
* 🔄 Data remains available after logging out and logging back in
* 📱 Responsive dashboard interface

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Axios
* Chart.js
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs

### Deployment

* Render
* MongoDB Atlas
* GitHub

## 🏗️ Project Structure

```text
Expense_Tracker/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

> `.env` files are excluded from GitHub using `.gitignore`.

## 🔐 Authentication

The application uses **JWT authentication** to protect user-specific transaction data.

Users can:

1. Create an account
2. Log in securely
3. Add transactions
4. View their transaction history
5. Delete transactions
6. Log out and log back in while retaining their saved data

## 💾 Database

The application uses **MongoDB Atlas** to store user accounts and transactions.

Each transaction is associated with its respective authenticated user, ensuring that users access their own transaction data.

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/unaizy/Expense_Tracker.git
```

### 2. Open the project

```bash
cd Expense_Tracker
```

### 3. Start the backend

```bash
cd backend
npm install
npm start
```

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The React application will normally run at:

```text
http://localhost:3000
```

The backend will normally run at:

```text
http://localhost:5000
```

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Never upload your actual `.env` file or database credentials to GitHub.**

## 📸 Screenshots

Screenshots of the application will be added here.

## 👨‍💻 Author

**Unaiz Y**

Computer Science Engineering Student

GitHub:
https://github.com/unaizy

---

⭐ If you find this project useful, consider giving the repository a star!
