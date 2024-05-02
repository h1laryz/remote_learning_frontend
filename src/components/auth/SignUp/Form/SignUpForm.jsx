import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './SignUpForm.css';
import InputField from './InputField/InputField';
import DatePicker, { registerLocale } from "react-datepicker";
import enLocale from 'date-fns/locale/en-US';
import ukLocale from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css";
import RequiredLabel from './RequiredLabel/RequiredLabel';

registerLocale('en', enLocale);
registerLocale('uk', ukLocale);

const SignUpForm = () => {
  const { t, i18n } = useTranslation();
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ error, setError ] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Set loading state to true
    setLoading(true);
  
    // Get form data
    const formData = new FormData(event.target);
    const surname = formData.get('surname');
    const lastName = formData.get('lastName');
    const middleName = formData.get('middleName');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const dateOfBirth = formData.get('dateOfBirth');
  
    // Create request body
    const body = {
      surname,
      lastName,
      middleName: middleName || '', // Set middleName to empty string if it's null or undefined
      username,
      email,
      password,
      dateOfBirth,
    };
  
    try {
      // Make request
      const response = await fetch('http://localhost:8080/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      // Check if request was successful
      if (response.ok) {
        // Get the token from the response
        const token = await response.text();
  
        // Store the token in localStorage
        localStorage.setItem('token', token);
  
        // Redirect to the homepage
        window.location.href = '/';
      } else {
        // Get the error message from the response
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error;
  
        // Translate the error message to the current language
        const translatedErrorMessage = t(`error.${errorMessage}`);
  
        // Set error message
        setError(translatedErrorMessage);
  
        // Set loading state to false
        setLoading(false);
      }
    } catch (error) {
      setError(t('error.serverNotResponding'));
  
      // Set loading state to false
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <InputField label={t('surname')} required>
        <input type="text" name="surname" placeholder={t('surname')} />
      </InputField>
      <InputField label={t('lastName')} required>
        <input type="text" name="lastName" placeholder={t('lastName')} />
      </InputField>
      <InputField label={t('middleName')}>
        <input type="text" name="middleName" placeholder={t('middleName')} />
      </InputField>
      <InputField label={t('username')} required>
        <input type="text" name="username" placeholder={t('username')} />
      </InputField>
      <InputField label={t('email')} required>
        <input type="email" name="email" placeholder={t('email')} />
      </InputField>
      <InputField label={t('password')} required>
        <input type="password" name="password" placeholder={t('password')} />
      </InputField>
      <DatePicker
        selected={dateOfBirth} 
        onChange={(date) => setDateOfBirth(date)}
        wrapperClassName="datePicker" 
        dateFormat="dd/MM/yyyy"
        placeholderText={t('dateOfBirth')}
        locale={i18n.language}
      />
      <RequiredLabel />
      <button type="submit" disabled={loading}>{loading? 'Loading...' : t('signUp')}</button>
      {/* Add a Link to navigate to the login form */}
      <Link to="/login" className="form-link">{t('alreadyHaveAccount')} {t('login')}</Link>
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default SignUpForm;