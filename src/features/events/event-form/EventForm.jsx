/* global google */
import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../api/CategoryOptions';
import { listenToEvents } from '../eventActions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import {
  addEventToFirestore,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('You must provide a title'),
  category: Yup.string().required('You must select a category'),
  description: Yup.string().required(),
  city: Yup.object().shape({
    address: Yup.string().required('City is required'),
  }),
  venue: Yup.object().shape({
    address: Yup.string().required('Venue is required'),
  }),
  date: Yup.string().required(),
});

const EventForm = ({ match, history }) => {
  const selectedEvent = useSelector((state) =>
    state.event.events.find((evt) => evt.id === match.params.id),
  );
  const { loading, error } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    category: '',
    city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },
    date: '',
    description: '',
    title: '',
  };

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading Event...." />;

  if (error) return <Redirect to="/error" />;

  const handleFormSubmit = async (values, setSubmitting) => {
    try {
      selectedEvent
        ? await updateEventInFirestore(values)
        : await addEventToFirestore(values);
      setSubmitting(false);

      history.push('/events');
    } catch (e) {
      toast.error(e.message);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Segment clearing>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleFormSubmit(values, setSubmitting)
          }
        >
          {({ isSubmitting, dirty, isValid, values }) => (
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

              <MyPlaceInput name="city" placeholder="City" />

              <MyPlaceInput
                name="venue"
                disabled={!values.city.latLng}
                placeholder="Venue"
                options={{
                  location: new google.maps.LatLng(values.city.latLng),
                  radius: 1000,
                  types: ['establishment'],
                }}
              />

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
