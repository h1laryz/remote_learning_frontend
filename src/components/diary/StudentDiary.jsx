import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/Navigation';
import './StudentDiary.css';
import { t } from 'i18next';

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

  const formatDate = (dateTime) => {
    return dateTime ? dateTime.split(' ')[0] : ''; // Возвращаем только дату, игнорируя время
  };

  const renderAssignmentTable = (assignments) => (
    <table className="assignment-table">
      <thead>
        <tr>
          <th className="date-column">{t('date')}</th>
          <th>{t('nameOfAssignment')}</th>
          <th>{t('mark')}</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map(assignment => (
          <tr key={assignment.assignment_name}>
            <td>{formatDate(assignment.assignment_date_time)}</td>
            <td>{assignment.assignment_name}</td>
            <td>{assignment.mark !== undefined ? assignment.mark : <span className="undefined-mark">ще не виставлено</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <Navigation jwtToken={localStorage.getItem('jwtToken')} />
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
                {subjects[subjectName] && subjects[subjectName].length > 0
                  ? renderAssignmentTable(subjects[subjectName])
                  : <p>No assignments available</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDiary;
