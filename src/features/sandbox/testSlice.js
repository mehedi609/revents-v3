import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'tests',
  initialState: { data: 42 },
  reducers: {
    increment(state, action) {
      state.data += action.payload;
    },
    decrement(state, action) {
      state.data -= action.payload;
    },
  },
});

// Extract the action creators object and the reducer
// const { actions, reducer } = postsSlice;
// Extract and export each action creator by name
export const { increment, decrement } = testSlice.actions;
// Export the reducer, either as a default or named export
export const testReducer = testSlice.reducer;
