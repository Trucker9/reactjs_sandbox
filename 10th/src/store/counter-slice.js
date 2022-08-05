import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showCounter: true,
  counter: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,

  reducers: {
    increment(state, action) {
      state.counter++;
    },
    decrement(state, action) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state, action) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterAction = counterSlice.actions;
export default counterSlice.reducer;