import React from 'react';
import EventListItem from './EventListItem';
import { useSelector } from 'react-redux';

const EventList = () => {
  const { events } = useSelector((state) => state.event);
  return (
    <>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  );
};

export default EventList;
