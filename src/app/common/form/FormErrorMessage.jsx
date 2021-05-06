import React from 'react';

const FormErrorMessage = ({ errorMsg, _style = false }) => {
  return (
    <div
      style={{
        color: '#db2828',
        marginTop: '5px',
        marginBottom: `${_style ? '10px' : ''}`,
      }}
    >
      *{errorMsg}
    </div>
  );
};

export default FormErrorMessage;
