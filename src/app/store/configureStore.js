import { configureStore } from '@reduxjs/toolkit';
// import { testReducer } from '../../features/sandbox/testSlice';
// import { eventReducer } from '../../features/events/eventSlice';
import { testReducer } from '../../features/sandbox/testReducer';
import { eventReducer } from '../../features/events/eventReducer';

// import rootReducer from './reducers'

export const store = configureStore({
  reducer: {
    test: testReducer,
    event: eventReducer,
  },
});
