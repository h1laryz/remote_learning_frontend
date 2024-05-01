import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Form.css';

const SignUpForm = () => {
  return (
    <form className="form-container">
      <input type="text" placeholder="Surname" />
      <input type="text" placeholder="Middle Name" />
      <input type="text" placeholder="Last Name" />
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="date" placeholder="Date of Birth" />
      <button type="submit">Sign Up</button>
      {/* Add a Link to navigate to the login form */}
      <Link to="/login" className="form-link">Already have an account? Login</Link>
    </form>
  );
};

export default SignUpForm;
