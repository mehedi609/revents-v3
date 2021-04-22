import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import { delay } from '../../app/common/util/util';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const increment = (amount) => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    await delay(1000);
    dispatch({ type: INCREMENT_COUNTER, payload: amount });
    dispatch(asyncActionFinish());
  } catch (e) {
    dispatch(asyncActionError(e));
  }
};

export const decrement = (amount) => async (dispatch) => {
  dispatch(asyncActionStart());
  try {
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER, payload: amount });
    dispatch(asyncActionFinish());
  } catch (e) {
    dispatch(asyncActionError(e));
  }
};

const initialState = {
  data: 42,
};

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: state.data + action.payload };

    case DECREMENT_COUNTER:
      return { ...state, data: state.data - action.payload };

    default:
      return state;
  }
};
