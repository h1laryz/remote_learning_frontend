import React, { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/Login/LoginPage';
import SignUpPage from './components/auth/SignUp/SignUpPage';
import ChatPage from './components/Chat/ChatPage';
import AdminPage from './components/admin/AdminPage'
import StudentHomeworkPage from './components/homework/StudentHomeworkPage';
import TeacherHomeworkPage from './components/homework/TeacherHomeworkPage';
//import Chat from './components/Chat/Chat';

import { useJwt } from "react-jwt";

function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));

  const { decodedToken, isExpired } = useJwt(jwtToken);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const handleLogin = (jwtToken) => {
    setJwtToken(jwtToken);
    localStorage.setItem('jwtToken', jwtToken);
  };

  const handleLogout = () => {
    setJwtToken(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="uk">Українська</option>
          </select>
          <Routes>
            <Route exact path="/" element={jwtToken ? <ChatPage /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin" element={jwtToken ? <AdminPage /> : <Navigate to="/login" replace />} />
            <Route path="/assignments" element={<TeacherHomeworkPage />} />
            {/* <Route path="/chat/:chatId" element={<Chat onLogout={handleLogout} />} /> */} 
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;