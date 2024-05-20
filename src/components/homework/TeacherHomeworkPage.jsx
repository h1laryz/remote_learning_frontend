import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

import './TeacherHomeworkPage.css';

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
  const [markInputs, setMarkInputs] = useState({});
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});

  const { t, i18n } = useTranslation();

  // Fetch assignments from the backend
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/v1/subject/assignments/teacher', {
        headers: {
          Authorization: `${localStorage.getItem('jwtToken')}`
        }
      });
      const fetchedAssignments = response.data.map(assignment => ({
        ...assignment,
        solutions: assignment.solutions || []
      }));
      setAssignments(fetchedAssignments);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setIsLoading(false);
    }
  };

  const handleAddAssignment = () => {
    setIsAddingAssignment(prevState => !prevState);
  };

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
      formData.append('deadline', deadline.toISOString());
      formData.append('subject_group_name', newAssignmentData.subject_group_name);
      formData.append('subject_name', newAssignmentData.subject_name);
      formData.append('assignment_name', newAssignmentData.assignment_name);

      const response = await axios.post('http://localhost:8080/v1/subject/assignment/add', formData, {
        headers: {
          'Authorization': `${jwtToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setRequestSuccess(true);
        const newAssignment = response.data;
        const assignmentToAdd = {
          id: newAssignment.id,
          assignment_name: newAssignmentData.assignment_name,
          subject_name: newAssignmentData.subject_name,
          subject_group_name: newAssignmentData.subject_group_name,
          deadline: deadline.toISOString(),
          s3_location: newAssignment.s3_location,
          solutions: []
        };

        setAssignments(prevAssignments => [...prevAssignments, assignmentToAdd]);

        setNewAssignmentData({
          assignment_file: null,
          subject_group_name: '',
          subject_name: '',
          assignment_name: ''
        });
      } else {
        setRequestSuccess(false);
        setErrorMessage(response.data.error || 'Unknown error');
      }
    } catch (error) {
      setRequestSuccess(false);
      setErrorMessage(error.response ? error.response.data.error : 'Unknown error');
    }
    setMessageVisible(true);
  };

  const handleMarkChange = (e, uniqueKey) => {
    const value = e.target.value;
    setMarkInputs({
      ...markInputs,
      [uniqueKey]: value
    });
  };

  const handleMarkSubmit = async (assignmentId, solutionId, s3Location) => {
    const uniqueKey = `${assignmentId}-${solutionId}`;
    const mark = markInputs[uniqueKey];
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
      if (response.status === 200) {
        await fetchAssignments(); // Fetch updated data after successful submission
        setMarkInputs({ ...markInputs, [uniqueKey]: '' }); // Clear the mark input for the submitted solution
      } else {
        console.error('Error submitting mark:', response.data);
      }
    } catch (error) {
      console.error('Error submitting mark:', error);
    }
  };

  const toggleSubject = (subjectName) => {
    setExpandedSubjects({
      ...expandedSubjects,
      [subjectName]: !expandedSubjects[subjectName]
    });
  };

  return (
    <div className="teacher-homework-page">
      <h1>Teacher's Assignments Page</h1>
      <button onClick={handleAddAssignment}>{isAddingAssignment ? 'Close Form' : 'Add New Assignment'}</button>
      {isAddingAssignment && (
        <div>
          <h2>Add New Assignment</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" name="assignment_file" onChange={handleFileChange} />
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              wrapperClassName="datePicker"
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText={t('deadline')}
              locale={i18n.language}
            />
            <input type="text" name="subject_group_name" placeholder="Subject Group Name" value={newAssignmentData.subject_group_name} onChange={handleInputChange} />
            <input type="text" name="subject_name" placeholder="Subject Name" value={newAssignmentData.subject_name} onChange={handleInputChange} />
            <input type="text" name="assignment_name" placeholder="Assignment Name" value={newAssignmentData.assignment_name} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
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
            Object.values(assignments.reduce((acc, assignment) => {
              const key = `${assignment.subject_name}-${assignment.subject_group_name}`;
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(assignment);
              return acc;
            }, {})).map((groupedAssignments) => (
              <div key={groupedAssignments[0].subject_name + '-' + groupedAssignments[0].subject_group_name} className="subject-group">
                <h2 onClick={() => toggleSubject(groupedAssignments[0].subject_name)}>
                  {groupedAssignments[0].subject_name} - {groupedAssignments[0].subject_group_name}
                </h2>
                {expandedSubjects[groupedAssignments[0].subject_name] && (
                  groupedAssignments.sort((a, b) => {
                    if (a.solutions && a.solutions.length > 0 && b.solutions && b.solutions.length > 0) {
                      return b.solutions[0].mark - a.solutions[0].mark;
                    } else if (a.solutions && a.solutions.length > 0) {
                      return 1;
                    } else if (b.solutions && b.solutions.length > 0) {
                      return -1;
                    } else {
                      return 0;
                    }
                  }).map((assignment) => (
                    <div key={assignment.id} className="assignment">
                      <h3>{assignment.assignment_name}</h3>
                      <p>Deadline: {assignment.deadline}</p>
                      <a href={assignment.s3_location} target="_blank" rel="noreferrer">Filename: {assignment.s3_location}</a>
                      <h4>Solutions:</h4>
                      {assignment.solutions.length > 0 ? (
                        assignment.solutions.map((solution, i) => {
                          const uniqueKey = `${assignment.id}-${solution.id}`;
                          return (
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
                                    value={markInputs[uniqueKey] || ''}
                                    onChange={(e) => handleMarkChange(e, uniqueKey)}
                                  />
                                  <button onClick={() => handleMarkSubmit(assignment.id, solution.id, solution.s3_location)}>Submit Mark</button>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p>No solutions available</p>
                      )}
                    </div>
                  ))
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
