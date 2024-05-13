import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

import './HomeworkPage.css';

const TeacherHomeworkPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deadline, setDeadline] = useState(null);
  const [newAssignmentData, setNewAssignmentData] = useState({
    assignment_file: null,
    subject_group_name: '',
    subject_name: '',
    assignment_name: ''
  });
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [markInputs, setMarkInputs] = useState({}); // Состояние для хранения значений ввода оценок

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/subject/assignments/teacher', {
          headers: {
            Authorization: `${localStorage.getItem('jwtToken')}`
          }
        });
        setAssignments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignmentData({
      ...newAssignmentData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setNewAssignmentData({
      ...newAssignmentData,
      assignment_file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    setMessageVisible(false);
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const formData = new FormData();
      formData.append('assignment_file', newAssignmentData.assignment_file);
      formData.append('deadline', deadline.toISOString()); // Преобразование в формат ISOString
      formData.append('subject_group_name', newAssignmentData.subject_group_name);
      formData.append('subject_name', newAssignmentData.subject_name);
      formData.append('assignment_name', newAssignmentData.assignment_name);
  
      const response = await axios.post('http://localhost:8080/v1/subject/assignment/add', formData, {
        headers: {
          'Authorization': `${jwtToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.ok) {
        setRequestSuccess(true);
        const data = await response.json();
        console.log('Ответ сервера:', data);
        // Очистка данных формы после успешной отправки
        setNewAssignmentData({
          assignment_file: null,
          subject_group_name: '',
          subject_name: '',
          assignment_name: ''
        });
      } else {
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

  const handleMarkChange = (e, assignmentId) => {
    const value = e.target.value;
    setMarkInputs({
      ...markInputs,
      [assignmentId]: value
    });
  };

  const handleMarkSubmit = async (assignmentId, s3Location) => {
    const mark = markInputs[assignmentId];
    if (!mark || isNaN(mark) || parseInt(mark) < 0) {
      alert('Please enter a valid positive number for the mark.');
      return;
    }
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await axios.post(`http://localhost:8080/v1/subject/assignment/mark/add`, {
        mark: parseInt(mark),
        s3_location: s3Location
      }, {
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      if (response.ok) {
        // Обновить состояние или выполнить другие действия после успешной отправки оценки
      } else {
        // Обработать ошибку при отправке оценки
      }
    } catch (error) {
      // Обработать ошибку при отправке оценки
    }
};

  return (
    <div className="teacher-homework-page">
      <h1>Teacher's Assignments Page</h1>
      <div className="message">
        {messageVisible ? (requestSuccess ? 'Status: Success' : `Status: ${errorMessage}`) : ''}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {assignments.length === 0 ? (
            <p>No assignments available</p>
          ) : (
            assignments.map((assignment, index) => (
              <div key={index} className="assignment">
                <h2>{assignment.assignment_name}</h2>
                <p>Deadline: {assignment.deadline}</p>
                <p>Group: {assignment.subject_group_name}</p>
                <p>Subject name: {assignment.subject_name}</p>
                <a href={assignment.s3_location} target="_blank" rel="noreferrer">Filename: {assignment.s3_location}</a>
                <h3>Solutions:</h3>
                {assignment.solutions && assignment.solutions.length > 0 ? (
                  assignment.solutions.map((solution, i) => (
                    <div key={i} className="solution">
                      <p>Student: {solution.surname} {solution.last_name}</p>
                      <p>
                        Submitted solution: 
                        <a href={solution.s3_location} target="_blank" rel="noreferrer"> {solution.s3_location}</a>
                      </p>
                      {solution.mark ? (
                        <p>Mark: {solution.mark}</p>
                      ) : (
                        <div>
                          <input
                            type="text"
                            value={markInputs[assignment.id] || ''}
                            onChange={(e) => handleMarkChange(e, assignment.id)}
                          />
                          <button onClick={() => handleMarkSubmit(assignment.id, solution.s3_location)}>Submit Mark</button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No solutions available</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherHomeworkPage;
