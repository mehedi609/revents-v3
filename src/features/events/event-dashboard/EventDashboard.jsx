import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/EventList';
import EventForm from '../event-form/EventForm';

const EventDashboard = () => {
  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <EventList />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventForm />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
