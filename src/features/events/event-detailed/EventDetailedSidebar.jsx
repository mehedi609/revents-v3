import React from 'react';
import { Item, Label, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EventDetailedSidebar = ({ attendees, hostUid }) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length > 0 ? 'people' : 'person'} People
        Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees.map((attendee) => (
            <Item
              style={{ position: 'relative' }}
              key={attendee.id}
              as={Link}
              to={`/profile/${attendee.id}`}
            >
              {hostUid === attendee.id && (
                <Label
                  style={{ position: 'absolute' }}
                  color="orange"
                  ribbon="right"
                  content="Host"
                />
              )}
              <Item.Image
                size="tiny"
                src={attendee.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.name}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
};

export default EventDetailedSidebar;
