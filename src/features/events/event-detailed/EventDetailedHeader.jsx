import React, { useState } from 'react';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  addUserAttendance,
  cancelUserAttendance,
} from '../../../app/firestore/firestoreService';
import { toast } from 'react-toastify';

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const EventDetailedHeader = ({ event, isGoing, isHosting }) => {
  const [loading, setLoading] = useState(false);

  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHosting && (
          <>
            {isGoing ? (
              <Button loading={loading} onClick={handleUserLeaveEvent}>
                Cancel My Place
              </Button>
            ) : (
              <Button
                color="teal"
                onClick={handleUserJoinEvent}
                loading={loading}
              >
                JOIN THIS EVENT
              </Button>
            )}
          </>
        )}

        {isHosting && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
