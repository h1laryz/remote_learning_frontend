import React from 'react';
import './LoginHeader.css';
import { I18nextProvider, useTranslation } from 'react-i18next';

const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="login-header">
      <h1>{t('login')}</h1>
    </div>
  );
};

export default LoginHeader;