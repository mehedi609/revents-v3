import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/EventList';
import { sampleData } from '../../../api/SampleData';

const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  /*const handleCreateEvent = (_event) => {
    setEvents([...events, _event]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt)),
    );
  };*/

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={handleDeleteEvent} />
        </Grid.Column>

        <Grid.Column width={6}>
          <h2>eVENT fILTERS</h2>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
