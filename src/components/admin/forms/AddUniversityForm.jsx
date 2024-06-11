import React from 'react';
import { useTranslation } from 'react-i18next';

import './Form.css'

const AddUniversityForm = ({ onSubmit, onChange, formData, setShowForm }) => {
  const { t } = useTranslation();

  return (
    <div className='card'>
      <div className="card-body">
        <form onSubmit={onSubmit}>
        <h2 className='card-title'>{t('createUniversity')}
          <button onClick={() => setShowForm(false)}  type="button" class="btn btn-outline-dark btn-sm">X</button>
        </h2>
          <div>
            <label>{t('nameOfUniversity')}</label>
            <input type="text" name="university_name" value={formData.university_name || ''} onChange={onChange}
            placeholder='kpi' />
          </div>
          <button className='btn btn-outline-success' type="submit">{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default AddUniversityForm;
