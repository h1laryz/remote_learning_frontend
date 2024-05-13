import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const DepartmentForm = ({ onSubmit, onChange, formData }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <h3>{t('createDepartment')}</h3>
      <div>
        <label>{t('facultyName')}</label>
        <input type="text" name="faculty_name" value={formData.faculty_name || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('departmentName')}</label>
        <input type="text" name="department_name" value={formData.department_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>Добавить</button>
    </form>
  );
};

export default DepartmentForm;
