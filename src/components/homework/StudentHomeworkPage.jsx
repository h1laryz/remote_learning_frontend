import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './HomeworkPage.css';

const StudentHomeworkPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);

  const [requestSuccess, setRequestSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.get('http://localhost:8080/v1/subject/assignments/student', {
          headers: {
            Authorization: `${jwtToken}`
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

  const handleSubmit = async (e, assignment) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const formData = new FormData();
      formData.append('subject_group_name', assignment.subject_group_name);
      formData.append('assignment_name', assignment.assignment_name);
      formData.append('assignment_solution_file', file);

      const response = await axios.post('http://localhost:8080/v1/subject/assignment/solution/add', formData, {
        headers: {
          'Authorization': `${jwtToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.ok) {
        setRequestSuccess(true);
        const data = await response.json();
        console.log('Ответ сервера:', data);
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="student-homework-page">
      <h1>Homework Page</h1>
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
                <a>{assignment.s3_location}</a>
                <p>Solution: {assignment.solution ? assignment.solution.s3_location : 'Not submitted'}</p>
                <p>Group: {assignment.subject_group_name}</p>
                <p>Subject: {assignment.subject_name}</p>
                {assignment.solution ? (
                  <p>Mark: {assignment.solution.mark ? assignment.solution.mark : 'no mark yet'}</p>
                  ) : (
                  <p>No mark yet</p>
                )}

                <form onSubmit={(e) => handleSubmit(e, assignment)} style={{ display: assignment.solution ? 'none' : 'block' }}>
                  <input type="file" onChange={handleFileChange} />
                  <button type="submit">Submit Solution</button>
                </form>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentHomeworkPage;
