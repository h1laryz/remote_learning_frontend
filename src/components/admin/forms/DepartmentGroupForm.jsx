import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'
import { t } from 'i18next';

const DepartmentGroupForm = ({ onSubmit, onChange, formData }) => {
  return (
    <form onSubmit={onSubmit}>
      <h3>{t('createDepartmentGroup')}</h3>
      <div>
        <label>{t('departmentName')}</label>
        <input type="text" name="department_name" value={formData.department_name || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('groupName')}</label>
        <input type="text" name="department_group_name" value={formData.department_group_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>{t('submit')}</button>
    </form>
  );
};

export default DepartmentGroupForm;
