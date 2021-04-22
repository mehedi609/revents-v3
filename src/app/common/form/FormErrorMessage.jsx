import React from 'react';

const FormErrorMessage = ({ errorMsg }) => {
  return <div style={{ color: '#db2828', marginTop: '5px' }}>*{errorMsg}</div>;
};

export default FormErrorMessage;
