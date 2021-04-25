import React from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Button } from 'semantic-ui-react';
import { updateUserProfile } from '../../../app/firestore/firestoreService';

const ProfileForm = ({ profile }) => {
  const initialValues = {
    displayName: profile.displayName,
    description: profile.description || '',
  };

  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
  });

  async function handleOnSubmit(values, setSubmitting) {
    try {
      await updateUserProfile(values);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) =>
        handleOnSubmit(values, setSubmitting)
      }
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea name="description" placeholder="Description" />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
            type="submit"
            size="large"
            positive
            content="Update profile"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
