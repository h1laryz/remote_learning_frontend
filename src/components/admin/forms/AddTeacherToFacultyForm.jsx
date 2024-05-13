import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'
import { t } from 'i18next';

const AddTeacherToFacultyForm = ({ onSubmit, onChange, formData }) => {
  return (
    <form onSubmit={onSubmit}>
      <h3>{t('addTeacherToFaculty')}</h3>
      <div>
        <label>{t('usernameOrEmail')}</label>
        <input type="text" name="email_or_username" value={formData.email_or_username || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('facultyName')}</label>
        <input type="text" name="faculty_name" value={formData.faculty_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>{t('submit')}</button>
    </form>
  );
};

export default AddTeacherToFacultyForm;
