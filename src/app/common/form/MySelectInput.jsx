import React from 'react';
import { useField } from 'formik';
import { FormField, Select } from 'semantic-ui-react';

const MySelectInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />

      {meta.touched && meta.error && (
        <div style={{ color: '#db2828', marginTop: '5px' }}>*{meta.error}</div>
      )}
    </FormField>
  );
};

export default MySelectInput;
