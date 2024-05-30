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
      },
      'createSubject': 'Create subject',
      'createDepartment': "Create department",
      'createDepartmentGroup': 'Create department group',
      'createFaculty': 'Create faculty',
      'addStudentToDepartmentGroup': "Add Student to department group",
      'addStudentToSubjectGroup': "Add student to subject group",
      'createSubjectToDepartment': "Create subject in department",
      'createSubjectGroup': "Create subject group",
      'createSubjectGroupAsDepartmentGroup': "Create subject group as department group",
      'addTeacher': "Add teacher",
      'addTeacherToFaculty': "Add teacher to faculty",
      'createTeacherRank': "Create teacher rank",
      'createUniversity': "Create university",
      'nameOfUniversity': "Name of university",
      'submit': "Submit",
      'assignmentFile': "Assignment file",
      'facultyName': "Name of faculty",
      'universityName': "Name of university",
      'departmentName': "Name of department",
      'rank': "Rank",
      'adminPage': "Admin page",
      'groupName': "Name of group",
      'lectorUsernameOrEmail': "Lector's username or email",
      'subjectName': "Name of subject",
      'subjectGroupName': "Name of subject group",
      'usernameOrEmailOfPractic': "Practic's Username or Email",
      'nameOfProject': "Campus++",
      'chat': "Chat",
      'admin': "Admin's panel",
      'diary': "Diary",
      'assignments': "Assignments",
      'login': "Login",
      'signUp': "Sign up",
      'logout': "Logout",
      'helloWorldChat': "Select a chat to start messaging...",
      'noChatsYet': "No chats yet. Wait until administrator adds you in any subject group...",
      "chatTypeMsg": "Type a message...",
      "chatSend": "Send"
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
      },
      'createSubject': 'Створити предмет',
      'createDepartment': "Створити кафедру",
      'createDepartmentGroup': 'Створити групу на кафедрі',
      'createFaculty': 'Створити факультет',
      'addStudentToDepartmentGroup': "Додати студента до групи на кафедрі",
      'addStudentToSubjectGroup': "Додати студента до навчальної групи предмету",
      'createSubjectToDepartment': "Створити предмет на кафедрі",
      'createSubjectGroup': "Створити навчальну групу для предмету",
      'createSubjectGroupAsDepartmentGroup': "Створити навчальну групу, як групу з кафедри",
      'addTeacher': "Надати користувачу права вчителя",
      'addTeacherToFaculty': "Додати вчителя до факультету",
      'createTeacherRank': "Створити рівень вчителя",
      'createUniversity': "Створити університет",
      'nameOfUniversity': "Назва університету",
      'submit': "Виконати",
      'assignmentFile': "Файл завдання",
      'facultyName': "Назва факультету",
      'universityName': "Назва університету",
      'departmentName': "Назва кафедри",
      'rank': "Рівень",
      'adminPage': "Сторінка адміністратора",
      'groupName': "Назва групи",
      'lectorUsernameOrEmail': "Ім'я користувача або пошти лектора",
      'subjectName': "Назва предмету",
      'subjectGroupName': "Назва групи предмету",
      'usernameOrEmailOfPractic': "Ім'я користувача або пошта практика",
      'nameOfProject': "Кампус++",
      'chat': "Чат",
      'admin': "Панель адміністратора",
      'diary': "Щоденник",
      'assignments': "Завдання",
      'login': "Увійти",
      'signUp': "Зареєструватися",
      'logout': "Вийти",
      'helloWorldChat': "Оберіть чат, щоб розпочати спілкування...",
      'noChatsYet': "Чатів ще немає. Зачекайте поки адміністратор додасть вас у групу предмету...",
      'chatTypeMsg': "Надрукуйте повідомлення...",
      "chatSend": "Надіслати"
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