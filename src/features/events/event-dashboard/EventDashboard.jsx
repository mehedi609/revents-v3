import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) => {
        const data = snapshot.docs.map((docSnapshot) =>
          dataFromSnapshot(docSnapshot),
        );
        dispatch(listenToEvents(data));
        dispatch(asyncActionFinish());
        console.log(data);
      },
      error: (error) => {
        dispatch(asyncActionError(error));
      },
    });
    return unsubscribe;
  }, [dispatch]);*/

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          {loading && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )}
          <EventList events={events} />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventFilters />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
