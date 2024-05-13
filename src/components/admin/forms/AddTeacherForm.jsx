import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddTeacherForm = ({ onSubmit, onChange, formData }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <h3>{t('addTeacher')}</h3>
      <div>
        <label>{t('usernameOrEmail')}</label>
        <input type="text" name="email_or_username" value={formData.email_or_username || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('rank')}</label>
        <input type="text" name="rank_name" value={formData.rank_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>{t('submit')}</button>
    </form>
  );
};

export default AddTeacherForm;
