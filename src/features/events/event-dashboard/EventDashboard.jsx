import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/EventList';
import EventForm from '../event-form/EventForm';
import { sampleData } from '../../../api/SampleData';

const EventDashboard = ({
  formOpen,
  setFormOpen,
  selectedEvent,
  selectEvent,
}) => {
  const [events, setEvents] = useState(sampleData);

  const handleCreateEvent = (_event) => {
    setEvents([...events, _event]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt)),
    );
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={selectEvent}
            deleteEvent={handleDeleteEvent}
          />
        </Grid.Column>

        <Grid.Column width={6}>
          {formOpen && (
            <EventForm
              setFormOpen={setFormOpen}
              createEvent={handleCreateEvent}
              updateEvent={handleUpdateEvent}
              selectedEvent={selectedEvent}
              key={selectedEvent ? selectedEvent.id : null}
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
