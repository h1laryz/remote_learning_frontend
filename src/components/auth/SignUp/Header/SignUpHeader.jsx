import React from 'react';
import './SignUpHeader.css';
import { I18nextProvider, useTranslation } from 'react-i18next';

const SignUpHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="sign-up-header">
      <h1>{t('signUp')}</h1>
    </div>
  );
};

export default SignUpHeader;