import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddTeacherForm = ({ onSubmit, onChange, formData, setShowForm }) => {
  const { t } = useTranslation();

  return (
    <div className='card'>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <h2 className='card-title'>{t('addTeacher')}
            <button onClick={() => setShowForm(false)} type="button" class="btn btn-outline-dark btn-sm">X</button>
          </h2>
          <div>
            <label>{t('usernameOrEmail')}</label>
            <input type="text" name="email_or_username" value={formData.email_or_username || ''} onChange={onChange} 
            placeholder='ostap'/>
          </div>
          <div>
            <label>{t('rank')}</label>
            <input type="text" name="rank_name" value={formData.rank_name || ''} onChange={onChange} 
              placeholder='starshiy vukladach'/>
          </div>
          <button className='btn btn-outline-success' type="submit">{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherForm;
