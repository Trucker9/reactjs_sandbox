import { createStore } from 'redux';

// Reducer Function that is responsible for changing store.
const counterReducer = (existingState = { counter: 0 }, action) => {
  if (action.type === 'INCREMENT')
    return { counter: existingState.counter + 1 };
  if (action.type === 'DECREMENT')
    return { counter: existingState.counter - 1 };
  return existingState;
};
// Creating store and giving access to its reducer function.
const store = createStore(counterReducer);

export default store;
