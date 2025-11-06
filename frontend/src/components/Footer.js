import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Expense Tracker — Built with care</p>
      </div>
    </footer>
  );
};

export default Footer;
