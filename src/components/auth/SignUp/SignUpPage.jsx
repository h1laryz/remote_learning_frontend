import React from 'react';
import SignUpHeader from './Header/SignUpHeader';
import SignUpForm from './Form/SignUpForm';
import { Helmet } from 'react-helmet';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Navigation from '../../navigation/Navigation';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t("nameOfProject")} | {t("signUp")}</title>
      </Helmet>
      <Navigation />
      <SignUpHeader />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;