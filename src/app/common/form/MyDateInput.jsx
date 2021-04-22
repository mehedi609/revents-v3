import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormField } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormErrorMessage from './FormErrorMessage';

const MyDateInput = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error} style={{ width: '25%' }}>
      <label>{label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error && <FormErrorMessage errorMsg={meta.error} />}
    </FormField>
  );
};

export default MyDateInput;
