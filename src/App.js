import React, { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/Login/LoginPage';
import SignUpPage from './components/auth/SignUp/SignUpPage';

function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="uk">Українська</option>
          </select>
          <Routes> {/* Wrap Routes around Route components */}
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;