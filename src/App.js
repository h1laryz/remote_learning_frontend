import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/Login/LoginPage';
import SignUpPage from './components/auth/SignUp/SignUpPage';
import ChatPage from './components/Chat/ChatPage';
import AdminPage from './components/admin/AdminPage'
import StudentHomeworkPage from './components/homework/StudentHomeworkPage';
import TeacherHomeworkPage from './components/homework/TeacherHomeworkPage';
import StudentDiary from './components/diary/StudentDiary'
import Navigation from './components/navigation/Navigation';
import { useJwt } from "react-jwt";

function App() {
  const { t, i18n } = useTranslation();
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));

  const { decodedToken, isExpired } = useJwt(jwtToken);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleLogin = (jwtToken) => {
    setJwtToken(jwtToken);
    localStorage.setItem('jwtToken', jwtToken);
  };

  const handleLogout = () => {
    setJwtToken(null);
    localStorage.removeItem('jwtToken');
  };

  const isTeacher = decodedToken?.role === 'teacher';

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div>
          <Navigation jwtToken={jwtToken} />
          <Routes>
            <Route path="/" element={jwtToken ? <ChatPage /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin" element={jwtToken ? <AdminPage /> : <Navigate to="/login" replace />} />
            <Route path="/diary" element={<StudentDiary />} />
            <Route path="/assignments" element={isTeacher ? <TeacherHomeworkPage /> : <StudentHomeworkPage />} />
            {/* Redirects */}
            <Route path="*" element={!jwtToken ? <Navigate to="/login" replace /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;
