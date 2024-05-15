import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Подключаем файл стилей

const Navigation = ({ jwtToken }) => {
  return (
    <div className="navigation">
      <Link to="/" className="navigation-link">Chat</Link>
      <Link to="/login" className="navigation-link">Login</Link>
      <Link to="/signup" className="navigation-link">Sign Up</Link>
      {jwtToken && <Link to="/admin" className="navigation-link">Admin</Link>}
      <Link to="/diary" className="navigation-link">Diary</Link>
      <Link to="/assignments" className="navigation-link">Assignments</Link>
    </div>
  );
}

export default Navigation;
