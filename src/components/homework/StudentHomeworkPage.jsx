import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from "../navigation/Navigation"
import { Helmet } from 'react-helmet';
import './StudentHomeworkPage.css';
import { useTranslation } from 'react-i18next';

const StudentHomeworkPage = () => {
  const {t} = useTranslation();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [expandedSubjects, setExpandedSubjects] = useState(new Set());

  const [requestSuccess, setRequestSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');

        const response = await axios.get('http://localhost:8080/v1/subject/assignments/student', {
          headers: {
            Authorization: `${jwtToken}`
          }
        });

        // Группируем задания по предметам
        const groupedSubjects = groupAssignmentsBySubjects(response.data);
        setSubjects(groupedSubjects);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const groupAssignmentsBySubjects = (assignments) => {
    const subjectsMap = new Map();
    assignments.forEach((assignment) => {
      if (!subjectsMap.has(assignment.subject_name)) {
        subjectsMap.set(assignment.subject_name, []);
      }
      const subjectAssignments = subjectsMap.get(assignment.subject_name);
      subjectAssignments.push(assignment);
    });

    const groupedSubjects = [];
    subjectsMap.forEach((assignments, subjectName) => {
      groupedSubjects.push({
        subject_name: subjectName,
        assignments: assignments
      });
    });

    return groupedSubjects;
  };

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

      if (response.status === 200) {
        setRequestSuccess(true);
        await fetchSubjects(); // Fetch updated data after successful submission
      } else {
        setRequestSuccess(false);
        if (response.status === 404) {
          setErrorMessage('Not found');
        } else {
          const errorData = await response.data;
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

  const fetchSubjects = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');

      const response = await axios.get('http://localhost:8080/v1/subject/assignments/student', {
        headers: {
          Authorization: `${jwtToken}`
        }
      });

      const groupedSubjects = groupAssignmentsBySubjects(response.data);
      setSubjects(groupedSubjects);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleSubject = (subjectName) => {
    const expandedSubjectsCopy = new Set(expandedSubjects);
    if (expandedSubjectsCopy.has(subjectName)) {
      expandedSubjectsCopy.delete(subjectName);
    } else {
      expandedSubjectsCopy.add(subjectName);
    }
    setExpandedSubjects(expandedSubjectsCopy);
  };

  const isDeadlineExpired = (deadline) => {
    const currentDateTime = new Date();
    const deadlineDateTime = new Date(deadline);
    return currentDateTime > deadlineDateTime;
  };

  // Fetch presigned URL for a specific S3 key
  const fetchPresignedUrl = async (s3Key) => {
    try {
      const response = await axios.get(`http://localhost:8080/v1/presigned-url?s3_key=${encodeURIComponent(s3Key)}`, {
        headers: {
          Authorization: `${localStorage.getItem('jwtToken')}`
        }
      });
      return response.data.url;
    } catch (error) {
      console.error('Error fetching presigned URL:', error);
      return null;
    }
  };

  // Handle file download
  const handleFileDownload = async (s3Key) => {
    const presignedUrl = await fetchPresignedUrl(s3Key);
    if (presignedUrl) {
      window.open(presignedUrl, '_blank');
    } else {
      alert('Failed to generate download link. Please try again later.');
    }
  };

  return (
    <div>
      <Helmet>
        <title>{t("nameOfProject")} | {t("assignments")}</title>
      </Helmet>
      <Navigation jwtToken={localStorage.getItem('jwtToken')} />
      <div className="student-homework-page">
        <h1>Homework Page</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {subjects.length === 0 ? (
              <p>No assignments available</p>
            ) : (
              subjects.map((subject, index) => (
                <div key={index} className="subject">
                  <h2 onClick={() => toggleSubject(subject.subject_name)}>
                    {subject.subject_name}
                  </h2>
                  {expandedSubjects.has(subject.subject_name) && (
                    <div>
                      {subject.assignments.map((assignment, assignmentIndex) => (
                        <div key={assignmentIndex} className="assignment">
                          <h4>{assignment.assignment_name}</h4>
                          <p>Deadline: {assignment.deadline}</p>
                          <button onClick={() => handleFileDownload(assignment.s3_location)}>Download Assignment</button>
                          <p>Solution: {assignment.solution ? <button onClick={() => handleFileDownload(assignment.solution.s3_location)}>Download Solution</button> : 'Not submitted'}</p>
                          {assignment.solution ? (
                            <p>Mark: {assignment.solution.mark ? assignment.solution.mark : 'no mark yet'}</p>
                          ) : (
                            isDeadlineExpired(assignment.deadline) ? (
                              <p>Deadline expired</p>
                            ) : (
                              <form onSubmit={(e) => handleSubmit(e, assignment)}>
                                <input type="file" onChange={handleFileChange} />
                                <button type="submit">Submit Solution</button>
                              </form>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
        <div className="message">
          {messageVisible ? (requestSuccess ? 'Status: Success' : `Status: ${errorMessage}`) : ''}
        </div>
      </div>
    </div>
  );
};

export default StudentHomeworkPage;
