import React, { useState } from 'react';
import DepartmentForm from './forms/DepartmentForm';
import DepartmentGroupForm from './forms/DepartmentGroupForm';
import FacultyForm from './forms/FacultyForm'; // Импортируем новую форму
import StudentForm from './forms/StudentForm';
import AddStudentToGroupForm from './forms/AddStudentToGroupForm';
import AddSubjectToDepartmentForm from './forms/AddSubjectToDepartmentGroup'
import AddSubjectGroupForm from './forms/AddSubjectGroupForm';
import AddSubjectGroupToDepartmentGroupForm from './forms/AddSubjectGroupToDepartmentGroupForm';
import AddTeacherForm from './forms/AddTeacherForm';
import AddTeacherToFacultyForm from './forms/AddTeacherToFacultyForm';
import AddTeacherRankForm from './forms/AddTeacherRankForm'; // Импортируем новую форму
import AddUniversityForm from './forms/AddUniversityForm';
import Navigation from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';
import { useJwt } from "react-jwt";
import { Helmet } from 'react-helmet';

import './AdminPage.css'

const AdminPage = () => {
  // Состояния для хранения данных форм
  const [departmentFormData, setDepartmentFormData] = useState({});
  const [groupFormData, setGroupFormData] = useState({});
  const [facultyFormData, setFacultyFormData] = useState({}); // Добавляем состояние для данных формы факультета
  const [studentFormData, setStudentFormData] = useState({});
  const [studentToGroupFormData, setStudentToGroupFormData] = useState({});
  const [subjectToDepartmentFormData, setSubjectToDepartmentFormData] = useState({});
  const [subjectGroupFormData, setSubjectGroupFormData] = useState({}); // Добавляем состояние для данных формы добавления группы предметов
  const [subjectGroupToDepartmentGroupFormData, setSubjectGroupToDepartmentGroupFormData] = useState({}); // Добавляем состояние для данных формы добавления группы предметов в качестве группы отдела
  const [teacherFormData, setTeacherFormData] = useState({});
  const [teacherToFacultyFormData, setTeacherToFacultyFormData] = useState({}); // Добавляем состояние для данных формы добавления учителя на факультет
  const [teacherRankFormData, setTeacherRankFormData] = useState({}); // Добавляем состояние для данных формы добавления звания учителя
  const [universityFormData, setUniversityFormData] = useState({});
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  // Состояния для отслеживания видимости форм
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showFacultyForm, setShowFacultyForm] = useState(false); // Добавляем состояние для отображения формы факультета
  const [showStudentForm, setShowStudentForm] = useState(false); // Добавляем состояние для отображения формы студента
  const [showStudentToGroupForm, setShowStudentToGroupForm] = useState(false); // Добавляем состояние для отображения формы добавления студента в группу предметов
  const [showSubjectToDepartmentForm, setShowSubjectToDepartmentForm] = useState(false);
  const [showSubjectGroupForm, setShowSubjectGroupForm] = useState(false); // Добавляем состояние для отображения формы добавления группы предметов
  const [showSubjectGroupToDepartmentGroupForm, setShowSubjectGroupToDepartmentGroupForm] = useState(false); // Добавляем состояние для отображения формы добавления группы предметов в качестве группы отдела
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showTeacherToFacultyForm, setShowTeacherToFacultyForm] = useState(false); // Добавляем состояние для отображения формы добавления учителя на факультет
  const [showTeacherRankForm, setShowTeacherRankForm] = useState(false); // Добавляем состояние для отображения формы добавления звания учителя
  const [showUniversityForm, setShowUniversityForm] = useState(false); // Добавляем состояние для отображения формы добавления университета

  // Обработчики изменения данных форм
  const handleDepartmentInputChange = (event) => {
    const { name, value } = event.target;
    setDepartmentFormData({ ...departmentFormData, [name]: value });
  };

  const handleGroupInputChange = (event) => {
    const { name, value } = event.target;
    setGroupFormData({ ...groupFormData, [name]: value });
  };

  const handleFacultyInputChange = (event) => { // Добавляем обработчик изменения данных формы факультета
    const { name, value } = event.target;
    setFacultyFormData({ ...facultyFormData, [name]: value });
  };

  const handleStudentInputChange = (event) => { // Добавляем обработчик изменения данных формы студента
    const { name, value } = event.target;
    setStudentFormData({ ...studentFormData, [name]: value });
  };

  const handleStudentToGroupInputChange = (event) => { // Добавляем обработчик изменения данных формы добавления студента в группу предметов
    const { name, value } = event.target;
    setStudentToGroupFormData({ ...studentToGroupFormData, [name]: value });
  };

  const handleSubjectToDepartmentInputChange = (event) => { // Добавляем обработчик изменения данных формы добавления предмета в отдел
    const { name, value } = event.target;
    setSubjectToDepartmentFormData({ ...subjectToDepartmentFormData, [name]: value });
  };

  const handleSubjectGroupInputChange = (event) => { // Добавляем обработчик изменения данных формы добавления группы предметов
    const { name, value } = event.target;
    setSubjectGroupFormData({ ...subjectGroupFormData, [name]: value });
  };

  const handleSubjectGroupToDepartmentGroupInputChange = (event) => { // Добавляем обработчик изменения данных формы добавления группы предметов в качестве группы отдела
    const { name, value } = event.target;
    setSubjectGroupToDepartmentGroupFormData({ ...subjectGroupToDepartmentGroupFormData, [name]: value });
  };

  const handleTeacherInputChange = (event) => {
    const { name, value } = event.target;
    setTeacherFormData({ ...teacherFormData, [name]: value });
  };

  const handleTeacherToFacultyInputChange = (event) => { // Добавляем обработчик изменения данных формы добавления учителя на факультет
    const { name, value } = event.target;
    setTeacherToFacultyFormData({ ...teacherToFacultyFormData, [name]: value });
  };

  const handleTeacherRankInputChange = (event) => { // Добавляем обработчик изменения данных формы добавления звания учителя
    const { name, value } = event.target;
    setTeacherRankFormData({ ...teacherRankFormData, [name]: value });
  };

  const handleUniversityInputChange = (event) => { // Добавляем обработчик изменения данных формы добавления университета
    const { name, value } = event.target;
    setUniversityFormData({ ...universityFormData, [name]: value });
  };

  // Функции для отправки данных на сервер
  const handleDepartmentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/department/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(departmentFormData),
      });
      if (response.ok) 
      {
        setRequestSuccess(true);
        const data = await response.json();
        console.log('Ответ сервера:', data);
        // Очистка данных формы после успешной отправки
        setDepartmentFormData({});
      } 
      else 
      {
        setRequestSuccess(false);
        if (response.status === 404) {
          setErrorMessage('Not found');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Unknown error');
          console.error('Ошибка:', errorData);
        }
      }
    } catch (error) {
      setErrorMessage('Unknown error');
      setRequestSuccess(false);
      console.error('Ошибка:', error);
    }
    setMessageVisible(true);
  };

  const handleGroupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/department/group/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(groupFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setGroupFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleFacultySubmit = async (event) => { // Добавляем функцию для отправки данных формы факультета
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/faculty/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(facultyFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setFacultyFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleStudentSubmit = async (event) => { // Добавляем функцию для отправки данных формы студента
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/student/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(studentFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setStudentFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleStudentToGroupSubmit = async (event) => { // Добавляем функцию для отправки данных формы добавления студента в группу предметов
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/department/group/add_student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(studentToGroupFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setStudentToGroupFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleSubjectToDepartmentSubmit = async (event) => { // Добавляем функцию для отправки данных формы добавления предмета в отдел
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/department/subject/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(subjectToDepartmentFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setSubjectToDepartmentFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleSubjectGroupSubmit = async (event) => { // Добавляем функцию для отправки данных формы добавления группы предметов
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/subject/group/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(subjectGroupFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setSubjectGroupFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleSubjectGroupToDepartmentGroupSubmit = async (event) => { // Добавляем функцию для отправки данных формы добавления группы предметов в качестве группы отдела
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/subject/group/department_group_add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(subjectGroupToDepartmentGroupFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setSubjectGroupToDepartmentGroupFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleTeacherSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/teacher/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(teacherFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setTeacherFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleTeacherToFacultySubmit = async (event) => { // Добавляем функцию для отправки данных формы добавления учителя на факультет
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/faculty/add_teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(teacherToFacultyFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setTeacherToFacultyFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleTeacherRankSubmit = async (event) => { // Добавляем функцию для отправки данных формы добавления звания учителя
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/teacher/rank/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(teacherRankFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setTeacherRankFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  const handleUniversitySubmit = async (event) => { // Добавляем функцию для отправки данных формы добавления университета
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/admin/university/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('jwtToken')
        },
        body: JSON.stringify(universityFormData),
      });
      if (response.ok) 
        {
          setRequestSuccess(true);
          const data = await response.json();
          console.log('Ответ сервера:', data);
          // Очистка данных формы после успешной отправки
          setUniversityFormData({});
        } 
        else 
        {
          setRequestSuccess(false);
          if (response.status === 404) {
            setErrorMessage('Not found');
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Unknown error');
            console.error('Ошибка:', errorData);
          }
        }
      } catch (error) {
        setRequestSuccess(false);
        setErrorMessage('Unknown error');
      }
      setMessageVisible(true);
  };

  // Функция для переключения видимости формы
  const toggleTeacherFormVisibility = () => {
    setMessageVisible(false);
    setShowTeacherForm(!showTeacherForm);
  };


  // Функции для переключения видимости форм
  const toggleDepartmentFormVisibility = () => {
    setMessageVisible(false);
    setShowDepartmentForm(!showDepartmentForm);
  };

  const toggleGroupFormVisibility = () => {
    setMessageVisible(false);
    setShowGroupForm(!showGroupForm);
  };

  const toggleFacultyFormVisibility = () => { // Добавляем функцию для переключения видимости формы факультета
    setMessageVisible(false);
    setShowFacultyForm(!showFacultyForm);
  };

  
  const toggleStudentFormVisibility = () => { // Добавляем функцию для переключения видимости формы студента
    setMessageVisible(false);
    setShowStudentForm(!showStudentForm);
  };

  const toggleStudentToGroupFormVisibility = () => { // Добавляем функцию для переключения видимости формы добавления студента в группу предметов
    setMessageVisible(false);
    setShowStudentToGroupForm(!showStudentToGroupForm);
  };

  const toggleSubjectToDepartmentFormVisibility = () => { // Добавляем функцию для переключения видимости формы добавления предмета в отдел
    setMessageVisible(false);
    setShowSubjectToDepartmentForm(!showSubjectToDepartmentForm);
  };

  const toggleSubjectGroupFormVisibility = () => { // Добавляем функцию для переключения видимости формы добавления группы предметов
    setMessageVisible(false);
    setShowSubjectGroupForm(!showSubjectGroupForm);
  };

  const toggleSubjectGroupToDepartmentGroupFormVisibility = () => { // Добавляем функцию для переключения видимости формы добавления группы предметов в качестве группы отдела
    setMessageVisible(false);
    setShowSubjectGroupToDepartmentGroupForm(!showSubjectGroupToDepartmentGroupForm);
  };

  const toggleTeacherToFacultyFormVisibility = () => { // Добавляем функцию для переключения видимости формы добавления учителя на факультет
    setMessageVisible(false);
    setShowTeacherToFacultyForm(!showTeacherToFacultyForm);
  };

  const toggleTeacherRankFormVisibility = () => { // Добавляем функцию для переключения видимости формы добавления звания учителя
    setMessageVisible(false);
    setShowTeacherRankForm(!showTeacherRankForm);
  };

  const toggleUniversityFormVisibility = () => { // Добавляем функцию для переключения видимости формы добавления университета
    setMessageVisible(false);
    setShowUniversityForm(!showUniversityForm);
  };

  const { t } = useTranslation();

  const jwtToken = localStorage.getItem('jwtToken');
  const { decodedToken, isExpired } = useJwt(jwtToken);
  const level = decodedToken?.level;
  console.log("level: ", level);
  console.log("decodedToken: ", decodedToken);

  return (
    <div>
      <Helmet>
        <title>{t("nameOfProject")} | {t("admin")}</title>
      </Helmet>

      <Navigation jwtToken={localStorage.getItem('jwtToken')} />
      <div className='AdminPage'>
        <h2>{t('adminPage')}</h2>
        <div className="message">
          {messageVisible ? (requestSuccess ? 'Status: Success' : `Status: ${errorMessage}`) : ''}
        </div>
        <div className='button-matrix'>
          { level === "full" &&
            <button onClick={toggleUniversityFormVisibility}>{t('createUniversity')}</button> 
          }
          {showUniversityForm && (
              <AddUniversityForm onSubmit={handleUniversitySubmit} onChange={handleUniversityInputChange} formData={universityFormData} />
          )}

          { (level === "full" || level === "faculty") && 
            <button onClick={toggleFacultyFormVisibility}>{t('createFaculty')}</button>
          }
          {showFacultyForm && (
              <FacultyForm onSubmit={handleFacultySubmit} onChange={handleFacultyInputChange} formData={facultyFormData} />
          )}
          
          { (level === "full" || level === "faculty" || level === "department") && 
            <button onClick={toggleDepartmentFormVisibility}>{t('createDepartment')}</button>
          }
          {showDepartmentForm && (
              <DepartmentForm onSubmit={handleDepartmentSubmit} onChange={handleDepartmentInputChange} formData={departmentFormData} />
          )}

          { (level === "full" || level === "faculty") && 
            <button onClick={toggleTeacherRankFormVisibility}>{t('createTeacherRank')}</button>
          }
          {showTeacherRankForm && (
              <AddTeacherRankForm onSubmit={handleTeacherRankSubmit} onChange={handleTeacherRankInputChange} formData={teacherRankFormData} />
          )}

          { (level === "full" || level === "faculty") && 
            <button onClick={toggleTeacherFormVisibility}>{t('addTeacher')}</button>
          }
          {showTeacherForm && (
              <AddTeacherForm onSubmit={handleTeacherSubmit} onChange={handleTeacherInputChange} formData={teacherFormData} />
          )}

          { (level === "full" || level === "faculty") && 
            <button onClick={toggleTeacherToFacultyFormVisibility}>{t('addTeacherToFaculty')}</button>
          }
          {showTeacherToFacultyForm && (
              <AddTeacherToFacultyForm onSubmit={handleTeacherToFacultySubmit} onChange={handleTeacherToFacultyInputChange} formData={teacherToFacultyFormData} />
          )}
          
          { (level === "full" || level === "faculty" || level === "department") && 
            <button onClick={toggleGroupFormVisibility}>{t('createDepartmentGroup')}</button>
          }
          {showGroupForm && (
              <DepartmentGroupForm onSubmit={handleGroupSubmit} onChange={handleGroupInputChange} formData={groupFormData} />
          )}

          { (level === "full" || level === "faculty" || level === "department") && 
            <button onClick={toggleStudentFormVisibility}>{t('addStudentToDepartmentGroup')}</button>
          }
          {showStudentForm && (
              <StudentForm onSubmit={handleStudentSubmit} onChange={handleStudentInputChange} formData={studentFormData} />
          )}

          { (level === "full" || level === "faculty" || level === "department") && 
            <button onClick={toggleSubjectToDepartmentFormVisibility}>{t('createSubjectToDepartment')}</button>
          }
          {showSubjectToDepartmentForm && (
              <AddSubjectToDepartmentForm onSubmit={handleSubjectToDepartmentSubmit} onChange={handleSubjectToDepartmentInputChange} formData={subjectToDepartmentFormData} />
          )}

          { (level === "full" || level === "faculty" || level === "department") && 
            <button onClick={toggleSubjectGroupFormVisibility}>{t('createSubjectGroup')}</button>
          }
          {showSubjectGroupForm && (
              <AddSubjectGroupForm onSubmit={handleSubjectGroupSubmit} onChange={handleSubjectGroupInputChange} formData={subjectGroupFormData} />
          )}

          { (level === "full" || level === "faculty" || level === "department") && 
            <button onClick={toggleStudentToGroupFormVisibility}>{t('addStudentToSubjectGroup')}</button>
          }
          {showStudentToGroupForm && (
              <AddStudentToGroupForm onSubmit={handleStudentToGroupSubmit} onChange={handleStudentToGroupInputChange} formData={studentToGroupFormData} />
          )}

          { (level === "full" || level === "faculty" || level === "department") && 
            <button onClick={toggleSubjectGroupToDepartmentGroupFormVisibility}>{t('createSubjectGroupAsDepartmentGroup')}</button>
          }
          {showSubjectGroupToDepartmentGroupForm && (
              <AddSubjectGroupToDepartmentGroupForm onSubmit={handleSubjectGroupToDepartmentGroupSubmit} onChange={handleSubjectGroupToDepartmentGroupInputChange} formData={subjectGroupToDepartmentGroupFormData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
