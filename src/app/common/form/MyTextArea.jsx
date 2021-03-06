import React from 'react';
import { useField } from 'formik';
import { FormField } from 'semantic-ui-react';
import FormErrorMessage from './FormErrorMessage';

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />

      {meta.touched && meta.error && <FormErrorMessage errorMsg={meta.error} />}
    </FormField>
  );
};

export default MyTextArea;
