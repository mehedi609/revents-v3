import { createSlice } from '@reduxjs/toolkit';
import { sampleData } from '../../api/SampleData';

const eventSlice = createSlice({
  name: 'events',
  initialState: { events: sampleData },
  reducers: {
    createEvent(state, action) {
      state.events.push(action.payload);
    },
    updateEvent(state, action) {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event,
      );
    },
    deleteEvent(state, action) {
      state.events = state.events.filter((evt) => evt.id !== action.payload);
    },
  },
});

// Extract the action creators object and the reducer
// const { actions, reducer } = postsSlice;
// Extract and export each action creator by name
export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;
// Export the reducer, either as a default or named export
export const eventReducer = eventSlice.reducer;
