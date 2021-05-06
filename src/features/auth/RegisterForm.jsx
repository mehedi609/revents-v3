import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Divider } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../app/firestore/firebaseService';
import FormErrorMessage from '../../app/common/form/FormErrorMessage';
import SocialLogin from './SocialLogin';

export default function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Register to Re-vents">
      <Formik
        initialValues={{ displayName: '', email: '', password: '' }}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            console.log(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput name="displayName" placeholder="DisplayName" />
            <MyTextInput name="email" placeholder="Email Address" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            {errors.auth && (
              <FormErrorMessage errorMsg={errors.auth} _style={true} />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Register"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
