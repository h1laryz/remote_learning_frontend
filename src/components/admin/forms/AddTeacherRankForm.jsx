import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddTeacherRankForm = ({ onSubmit, onChange, formData, setShowForm }) => {
  const { t } = useTranslation();

  return (
    <div className='card'>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <h2 className='card-title'>{t('createTeacherRank')}
              <button onClick={() => setShowForm(false)}  type="button" class="btn btn-outline-dark btn-sm">X</button>
            </h2>
          <div>
            <label>{t('rank')}</label>
            <input type="text" name="teacher_rank" value={formData.teacher_rank || ''} onChange={onChange} 
            placeholder='starshiy vukladach'/>
          </div>
          <button className='btn btn-outline-success' type="submit">{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherRankForm;
