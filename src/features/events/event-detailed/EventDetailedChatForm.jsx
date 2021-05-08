import React from 'react';
import { Form, Formik } from 'formik';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import { toast } from 'react-toastify';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Button } from 'semantic-ui-react';

const EventDetailedChatForm = ({ eventId }) => {
  return (
    <>
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addEventChatComment(eventId, values.comment);
            resetForm();
          } catch (e) {
            toast.error(e.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <MyTextArea
              name="comment"
              placeholder="Please enter your comment here"
              rows={2}
            />
            <Button
              loading={isSubmitting}
              content="Add reply"
              icon={`edit`}
              primary
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EventDetailedChatForm;
