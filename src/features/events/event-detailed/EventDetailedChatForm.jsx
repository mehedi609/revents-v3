import React from 'react';
import { Form, Formik, Field } from 'formik';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';
import * as Yup from 'yup';

const EventDetailedChatForm = ({ eventId, parentId, closeForm }) => {
  return (
    <>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={Yup.object({
          comment: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addEventChatComment(eventId, { ...values, parentId });
            resetForm();
          } catch (e) {
            toast.error(e.message);
          } finally {
            setSubmitting(false);
            closeForm();
          }
        }}
      >
        {({ isSubmitting, handleSubmit, isValid }) => (
          <Form className="ui form">
            <Field name="comment">
              {({ field }) => (
                <div style={{ position: 'relative' }}>
                  <Loader active={isSubmitting} />
                  <textarea
                    rows={2}
                    {...field}
                    placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.shiftKey) return;
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        isValid && handleSubmit();
                      }
                    }}
                  />
                </div>
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EventDetailedChatForm;
