import React, { useState, useEffect } from 'react';
import './StudentDiary.css'

const StudentDiary = () => {
  const [subjects, setSubjects] = useState({});
  const [expandedSubjects, setExpandedSubjects] = useState({});

  useEffect(() => {
    fetchDiaryData();
  }, []);

  const fetchDiaryData = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/student/diary', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('jwtToken')
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSubjects(data);
      // Устанавливаем изначально все предметы раскрытыми
      setExpandedSubjects(Object.fromEntries(Object.keys(data).map(subject => [subject, true])));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleSubject = (subject) => {
    setExpandedSubjects(prevState => ({
      ...prevState,
      [subject]: !prevState[subject]
    }));
  };

  const getTotalScore = (assignments) => {
    return assignments.reduce((total, assignment) => {
      return total + (assignment.mark || 0);
    }, 0);
  };

  const renderAssignmentTable = (assignments) => (
    <table className="assignment-table">
      <thead>
        <tr>
          <th>Название задания</th>
          <th>Оценка</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map(assignment => (
          <tr key={assignment.assignment_name}>
            <td>{assignment.assignment_name}</td>
            <td>{assignment.mark !== undefined ? assignment.mark : <span className="undefined-mark">ще не виставлено</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="diary-container">
      {Object.keys(subjects).map(subjectName => (
        <div key={subjectName} className="subject-container">
          <h3
            className="subject-header"
            onClick={() => toggleSubject(subjectName)}
          >
            {subjectName} (Total: {getTotalScore(subjects[subjectName])})
          </h3>
          {expandedSubjects[subjectName] && (
            <div>
              <hr /> {/* Полоса между таблицами */}
              {renderAssignmentTable(subjects[subjectName])}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentDiary;
