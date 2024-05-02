import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './LoginForm.css';

const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <form className="form-container">
      <input type="text" placeholder={t('usernameOrEmail')} />
      <input type="password" placeholder={t('password')} />
      <button type="submit">{t('login')}</button>
      {/* Add a Link to navigate to the signup form */}
      <Link to="/signup" className="form-link">{t('dontHaveAccount')} {t('signUp')}</Link>
    </form>
  );
};

export default LoginForm;
