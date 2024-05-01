import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Form.css';

const LoginForm = () => {
  return (
    <form className="form-container">
      <input type="text" placeholder="Username/Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
      {/* Add a Link to navigate to the signup form */}
      <Link to="/signup" className="form-link">Don't have an account? Sign Up</Link>
    </form>
  );
};

export default LoginForm;
