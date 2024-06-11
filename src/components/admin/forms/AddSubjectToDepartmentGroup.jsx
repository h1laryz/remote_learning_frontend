import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddSubjectToDepartmentForm = ({ onSubmit, onChange, formData, setShowForm }) => {
  const { t } = useTranslation();

  return (
    <div className='card'>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <h2 className='card-title'>{t('createSubjectToDepartment')}
            <button onClick={() => setShowForm(false)}  type="button" class="btn btn-outline-dark btn-sm">X</button>
          </h2>
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
          <button className='btn btn-outline-success' type="submit">{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectToDepartmentForm;
