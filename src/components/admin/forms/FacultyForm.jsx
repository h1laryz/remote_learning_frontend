import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const FacultyForm = ({ onSubmit, onChange, formData }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <h3>{t('createFaculty')}</h3>
      <div>
        <label>{t('facultyName')}</label>
        <input type="text" name="faculty_name" value={formData.faculty_name || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('universityName')}</label>
        <input type="text" name="university_name" value={formData.university_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>{t('submit')}</button>
    </form>
  );
};

export default FacultyForm;
