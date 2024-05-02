import React from 'react';
import { useTranslation } from 'react-i18next';

import './RequiredLabel.css';


const RequiredLabel = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="required-label">
        <span className="required">*</span> &nbsp;{t('fieldsAreRequired')}
        </div>
    );
};

export default RequiredLabel;