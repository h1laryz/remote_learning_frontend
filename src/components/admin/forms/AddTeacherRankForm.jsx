import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddTeacherRankForm = ({ onSubmit, onChange, formData }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <h3>{t('createTeacherRank')}</h3>
      <div>
        <label>{t('rank')}</label>
        <input type="text" name="teacher_rank" value={formData.teacher_rank || ''} onChange={onChange} />
      </div>
      <button type="submit" className='submit-button'>Добавить</button>
    </form>
  );
};

export default AddTeacherRankForm;
