import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes from react-router-dom
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';

function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Wrap Routes around Route components */}
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
