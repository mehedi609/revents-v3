import React from 'react';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import EventDetailedChatForm from './EventDetailedChatForm';

const DisplayComment = ({
  comment,
  setShowReplyForm,
  showReplyForm,
  eventId,
  child,
}) => {
  return (
    <>
      <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
      <Comment.Content>
        <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
          {comment.displayName}
        </Comment.Author>
        <Comment.Metadata>
          <div>{formatDistance(comment.date, new Date())}</div>
        </Comment.Metadata>
        <Comment.Text>
          {comment.text.split('\n').map((text, i) => (
            <span key={i}>
              {text}
              <br />
            </span>
          ))}
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action
            onClick={() =>
              setShowReplyForm({ open: true, commentId: comment.id })
            }
          >
            Reply
          </Comment.Action>
          {showReplyForm.open && showReplyForm.commentId === comment.id && (
            <EventDetailedChatForm
              eventId={eventId}
              parentId={child ? comment.parentId : comment.id}
              setShowReplyForm={setShowReplyForm}
            />
          )}
        </Comment.Actions>
      </Comment.Content>
    </>
  );
};

export default DisplayComment;
