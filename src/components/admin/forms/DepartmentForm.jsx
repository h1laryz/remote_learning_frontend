import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const DepartmentForm = ({ onSubmit, onChange, formData, setShowForm }) => {
  const { t } = useTranslation();

  return (
    <div className='card'>
      <div className="card-body">
        <form onSubmit={onSubmit}>
        <h2 className='card-title'>{t('createDepartment')}
          <button onClick={() => setShowForm(false)}  type="button" class="btn btn-outline-dark btn-sm">X</button>
        </h2>
          <div>
            <label>{t('facultyName')}</label>
            <input type="text" name="faculty_name" value={formData.faculty_name || ''} onChange={onChange} 
            placeholder='fict'/>
          </div>
          <div>
            <label>{t('departmentName')}</label>
            <input type="text" name="department_name" value={formData.department_name || ''} onChange={onChange} 
            placeholder='ipi'/>
          </div>
          <button className='btn btn-outline-success' type="submit">{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
