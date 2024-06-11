import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'
import { t } from 'i18next';

const DepartmentGroupForm = ({ onSubmit, onChange, formData, setShowForm }) => {
  return (
    <div className='card'>
      <div className="card-body">
        <form onSubmit={onSubmit}>
        <h2 className='card-title'>{t('createDepartmentGroup')}
          <button onClick={() => setShowForm(false)}  type="button" class="btn btn-outline-dark btn-sm">X</button>
        </h2>
          <div>
            <label>{t('departmentName')}</label>
            <input type="text" name="department_name" value={formData.department_name || ''} onChange={onChange} />
          </div>
          <div>
            <label>{t('groupName')}</label>
            <input type="text" name="department_group_name" value={formData.department_group_name || ''} onChange={onChange} />
          </div>
          <button className='btn btn-outline-success' type="submit">{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentGroupForm;
