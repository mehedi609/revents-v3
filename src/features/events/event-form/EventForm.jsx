import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { createEvent, updateEvent } from '../eventSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../api/CategoryOptions';
import { createEvent, updateEvent } from '../eventActions';
import MyDateInput from '../../../app/common/form/MyDateInput';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('You must provide a title'),
  category: Yup.string().required('You must select a category'),
  description: Yup.string().required(),
  city: Yup.string().required(),
  venue: Yup.string().required(),
  date: Yup.string().required(),
});

const EventForm = ({ match, history }) => {
  const selectedEvent = useSelector((state) =>
    state.event.events.find((evt) => evt.id === match.params.id),
  );
  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    category: '',
    city: '',
    date: '',
    description: '',
    title: '',
    venue: '',
  };

  const handleFormSubmit = (values) => {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: 'Mehedi',
            attendees: [],
            hostPhotoURL: '/assets/user.png',
          }),
        );

    history.push('/events');
  };

  return (
    <>
      <Segment clearing>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="ui form ">
              <Header sub color="teal" content="Event Details" />
              <MyTextInput name="title" placeholder="Event Title" />

              <MySelectInput
                name="category"
                placeholder="Event Category"
                options={categoryData}
              />

              <MyTextArea
                name="description"
                placeholder="Description"
                rows={3}
              />

              <Header sub color="teal" content="Event Location" />

              <MyTextInput type="text" name="city" placeholder="City" />

              <MyTextInput type="text" name="venue" placeholder="Venue" />

              <MyDateInput
                name="date"
                placeholderText="Event date"
                timeFormat="HH:mm"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm a"
              />

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type={`submit`}
                floated={`right`}
                positive
                content={`Submit`}
              />
              <Button
                disabled={isSubmitting}
                as={Link}
                to="/events"
                type={`submit`}
                floated={`right`}
                content={`Cancel`}
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
};

export default EventForm;
