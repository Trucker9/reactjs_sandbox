import { createStore } from 'redux';

// Default state values
const statesObj = {
  // each data that we want to save as an state, should be added here.
  // when a data changes in the store (some data of this obj), the subscribed components will be updated.
  showCounter: true,
  counter: 0,
};
// Reducer Function that is responsible for changing store.
const counterReducer = (existingState = statesObj, action) => {
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
// Creating store and giving access to its reducer function.
const store = createStore(counterReducer);

export default store;
