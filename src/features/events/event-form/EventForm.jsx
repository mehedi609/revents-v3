/* global google */
import React, { useState } from 'react';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
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
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

const EventForm = ({ match, history }) => {
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const handleCancelToggle = async (event) => {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
    } catch (e) {
      toast.error(e.message);
    }
    setLoadingCancel(false);
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

              {selectedEvent && (
                <Button
                  loading={loadingCancel}
                  type="button"
                  floated="left"
                  color={selectedEvent.isCancelled ? 'green' : 'red'}
                  content={
                    selectedEvent.isCancelled
                      ? 'Reactivate event'
                      : 'Cancel Event'
                  }
                  // onClick={() => cancelEventToggle(selectedEvent)}
                  onClick={() => setConfirmOpen(true)}
                />
              )}

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
        <Confirm
          content={
            selectedEvent?.isCancelled
              ? 'This will reactivate the event - are you sure?'
              : 'This will cancel the event - are you sure?'
          }
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => handleCancelToggle(selectedEvent)}
        />
      </Segment>
    </>
  );
};

export default EventForm;
