import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import LoginHeader from './Header/LoginHeader';
import LoginForm from './Form/LoginForm';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleLogin = (jwtToken) => {
    onLogin(jwtToken); // Вызываем функцию onLogin из App.js
    navigate('/'); // Перенаправляем на основную страницу
  };

  return (
    <div>
      <LoginHeader />
      <LoginForm onLogin={handleLogin} /> {/* Передаем handleLogin в LoginForm */}
    </div>
  );
};

export default LoginPage;
