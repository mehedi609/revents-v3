import {
  CLEAR_COMMENTS,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  UPDATE_EVENT,
} from './eventConstants';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import { fetchSampleData } from '../../api/mockApi';
import { toast } from 'react-toastify';

export const loadEvents = () => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    const events = await fetchSampleData();
    dispatch({ type: FETCH_EVENTS, payload: events });
    dispatch(asyncActionFinish());
  } catch (e) {
    dispatch(asyncActionError(e));
    toast.error(e);
  }
};

export const listenToEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events,
  };
};

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(eventId) {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
}

export function listenToEventChat(comments) {
  console.log(comments);
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}

export function clearComments() {
  return {
    type: CLEAR_COMMENTS,
  };
}
