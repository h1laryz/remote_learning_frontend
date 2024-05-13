import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddSubjectToDepartmentForm = ({ onSubmit, onChange, formData }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <h3>{t('createSubjectToDepartment')}</h3>
      <div>
        <label>{t('lectorUsernameOrEmail')}</label>
        <input type="text" name="lector_email_or_username" value={formData.lector_email_or_username || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('departmentName')}</label>
        <input type="text" name="department_name" value={formData.department_name || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('subjectName')}</label>
        <input type="text" name="subject_name" value={formData.subject_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>{t('submit')}</button>
    </form>
  );
};

export default AddSubjectToDepartmentForm;
