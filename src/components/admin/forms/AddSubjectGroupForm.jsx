import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddSubjectGroupForm = ({ onSubmit, onChange, formData }) => {
  const {t} = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <h3>{t('createSubjectGroup')}</h3>
      <div>
        <label>{t('usernameOrEmailOfPractic')}</label>
        <input type="text" name="practic_email_or_username" value={formData.practic_email_or_username || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('subjectName')}</label>
        <input type="text" name="subject_name" value={formData.subject_name || ''} onChange={onChange} />
      </div>
      <div>
        <label>{t('subjectGroupName')}</label>
        <input type="text" name="subject_group_name" value={formData.subject_group_name || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>{t('submit')}</button>
    </form>
  );
};

export default AddSubjectGroupForm;
