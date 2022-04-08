// There is a problem using redux like this.
// In bigger apps, this file and its duties will get significantly larger and its hard to maintain. 
// So we use redux tool kit
import { createStore } from 'redux';

const statesObj = {
  showCounter: true,
  counter: 0,
};

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

const store = createStore(counterReducer);

export default store;
