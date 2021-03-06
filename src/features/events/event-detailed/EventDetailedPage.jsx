import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

const EventDetailedPage = ({ match }) => {
  const event = useSelector((state) =>
    state.event.events.find((evt) => evt.id === match.params.id),
  );

  const { currentUserProfile } = useSelector((state) => state.profile);

  const { loading, error } = useSelector((state) => state.async);

  const dispatch = useDispatch();

  const isHosting = event?.hostUid === currentUserProfile.id;
  const isGoing = event?.attendees.some(
    (attendee) => attendee.id === currentUserProfile.id,
  );

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Loading Event...." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={event}
          isHosting={isHosting}
          isGoing={isGoing}
        />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSidebar
          attendees={event?.attendees}
          hostUid={event?.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailedPage;
