import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import LoginHeader from './Header/LoginHeader';
import LoginForm from './Form/LoginForm';
import { Helmet } from 'react-helmet';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Navigation from '../../navigation/Navigation';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate(); // Инициализируем useNavigate

  const HandleLogin = (jwtToken) => {
    onLogin(jwtToken); // Вызываем функцию onLogin из App.js
    navigate('/'); // Перенаправляем на основную страницу
  };

  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t("nameOfProject")} | {t("login")}</title>
      </Helmet>
      <Navigation/>
      <LoginHeader />
      <LoginForm onLogin={HandleLogin} /> {/* Передаем handleLogin в LoginForm */}
    </div>
  );
};

export default LoginPage;
