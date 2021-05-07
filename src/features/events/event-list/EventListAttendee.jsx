import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EventListAttendee = ({ attendee }) => {
  return (
    <>
      <List.Item as={Link} to={`/profile/${attendee?.hostUid}`}>
        <Image size={`mini`} circular src={attendee.photoURL} />
      </List.Item>
    </>
  );
};

export default EventListAttendee;
