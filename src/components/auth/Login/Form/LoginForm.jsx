import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Импортируем axios для отправки запросов
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email_or_username: formData.get('email_or_username'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('http://localhost:8080/v1/login', data);
      const { token, error } = response.data;
      if (token) {
        onLogin(token); // Вызываем функцию onLogin из родительского компонента
      } else {
        setError(error); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      setError('Something went wrong'); // Устанавливаем сообщение об ошибке, если запрос не удался
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input type="text" name="email_or_username" placeholder={t('usernameOrEmail')} />
      <input type="password" name="password" placeholder={t('password')} />
      <button type="submit">{t('login')}</button>
      {error && <div className="error-message">{error}</div>} {/* Отображаем сообщение об ошибке, если оно есть */}
      <Link to="/signup" className="form-link">{t('dontHaveAccount')} {t('signUp')}</Link>
    </form>
  );
};

export default LoginForm;
