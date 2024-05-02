import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'surname': 'Surname',
      'middleName': 'Middle Name',
      'lastName': 'Last Name',
      'username': 'Username',
      'password': 'Password',
      'email': 'Email',
      'usernameOrEmail': "Username or Email",
      'dateOfBirth': 'Date of Birth',
      'signUp': 'Sign Up',
      'login': 'Log In',
      'alreadyHaveAccount': 'Already have an account?',
      'dontHaveAccount': "Don't have an account?",
      'fieldsAreRequired': "fields are required",
      'error': {
        'emailAlreadyExists': "Email already exists",
        'usernameAlreadyExists': "Username already exists",
        'serverNotResponding': "Server is not responding"
      }
    }
  },
  uk: {
    translation: {
      'surname': 'Прізвище',
      'middleName': 'По-батькові',
      'lastName': "Ім'я",
      'username': "Ім'я користувача",
      'password': 'Пароль',
      'email': 'Електронна пошта',
      'usernameOrEmail': "Ім'я користувача або пошта",
      'dateOfBirth': 'Дата народження',
      'signUp': 'Зареєструватись',
      'login': 'Увійти',
      'alreadyHaveAccount': 'Вже є аккаунт?',
      'dontHaveAccount': "Ще немає аккаунту?",
      'fieldsAreRequired': "поля є обов'язковими",
      'error': {
        'emailAlreadyExists': "Користувач з такою поштою вже існує",
        'usernameAlreadyExists': "Користувач з таким ім'ям користувача вже існує",
        'serverNotResponding': "Сервер недоступний",
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language to English
  fallbackLng: 'en', // Set the fallback language to English
  interpolation: {
    escapeValue: false
  }
});

export default i18n;