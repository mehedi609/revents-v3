import React, { useEffect, useState } from 'react';
import { Comment, Header, Segment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import {
  firebaseObjectToArray,
  getEventChatRef,
} from '../../../app/firestore/firebaseService';
import { clearComments, listenToEventChat } from '../eventActions';
import { Link } from 'react-router-dom';
import { createDataTree } from '../../../app/common/util/util';
import DisplayComment from './DisplayComment';

const EventDetailedChat = ({ eventId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getEventChatRef(eventId).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()),
      );
    });
    return () => {
      dispatch(clearComments());
      getEventChatRef().off();
    };
  }, [eventId, dispatch]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm
          eventId={eventId}
          parentId={0}
          setShowReplyForm={setShowReplyForm}
        />
        <Comment.Group>
          {createDataTree(comments).map((comment) => (
            <Comment key={comment.id}>
              <DisplayComment
                comment={comment}
                eventId={eventId}
                showReplyForm={showReplyForm}
                setShowReplyForm={setShowReplyForm}
                child={false}
              />
              {comment.childNodes.length > 0 && (
                <Comment.Group>
                  {comment.childNodes.reverse().map((child) => (
                    <Comment key={child.id}>
                      <DisplayComment
                        comment={child}
                        eventId={eventId}
                        showReplyForm={showReplyForm}
                        setShowReplyForm={setShowReplyForm}
                        child={true}
                      />
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default EventDetailedChat;
