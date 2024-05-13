import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddUniversityForm = ({ onSubmit, onChange, formData }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <h3>{t('createUniversity')}</h3>
      <div>
        <label>{t('nameOfUniversity')}</label>
        <input type="text" name="university_name" value={formData.university_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>{t('submit')}</button>
    </form>
  );
};

export default AddUniversityForm;
