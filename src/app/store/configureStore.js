import { configureStore } from '@reduxjs/toolkit';
import { testReducer } from '../../features/sandbox/testSlice';
import { eventReducer } from '../../features/events/eventSlice';

// import rootReducer from './reducers'

export const store = configureStore({
  reducer: {
    test: testReducer,
    event: eventReducer,
  },
});
