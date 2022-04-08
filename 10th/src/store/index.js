// There is a problem using redux like this.
// In bigger apps, this file and its duties will get significantly larger and its hard to maintain. 
// So we use redux tool kit
import {createSlice} from '@reduxjs/toolkit'
import { createStore } from 'redux';

const initialState = {
  showCounter: true,
  counter: 0,
};

// When we have different states that are not directly related we can use different slices.
createSlice({
  name: 'counter',
  initialState: initialState,
  // Here WE CAN mutate our state obj. redux toolkit will take care of bugs for us. 
  reducers: {
    increment(state, action) {
      state.counter++;
    },
    decrement(state, action) {
      state.counter --;
    },
    increase(state, action) {
      state.counter = state.counter + action.by;
    },
    toggleCounter(state, action) {
      state.showCounter = !state.showCounter;
    },
  }
});

const counterReducer = (existingState = initialState, action) => {
  if (action.type === 'INCREMENT' && action.by)
    return {
      ...existingState,
      counter: existingState.counter + 5,
    };
  if (action.type === 'INCREMENT')
    return {
      ...existingState,
      counter: existingState.counter + 1,
    };

  if (action.type === 'DECREMENT')
    return { ...existingState, counter: existingState.counter - 1 };

  if (action.type === 'TOGGLE') {
    return { ...existingState, showCounter: !existingState.showCounter };
  }

  return existingState;
};

const store = createStore(counterReducer);

export default store;
