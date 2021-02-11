import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/EventList';
import EventForm from '../event-form/EventForm';
import { sampleData } from '../../../api/SampleData';

const EventDashboard = ({ formOpen }) => {
  const [events, setEvents] = useState(sampleData);

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>

        <Grid.Column width={6}>{formOpen && <EventForm />}</Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
