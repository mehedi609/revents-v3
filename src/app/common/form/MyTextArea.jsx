import React from 'react';
import { useField } from 'formik';
import { FormField } from 'semantic-ui-react';

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />

      {meta.touched && meta.error && (
        <div style={{ color: '#db2828', marginTop: '5px' }}>*{meta.error}</div>
      )}
    </FormField>
  );
};

export default MyTextArea;
