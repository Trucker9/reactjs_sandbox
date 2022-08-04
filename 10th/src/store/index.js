// There is a problem using redux like this.
// In bigger apps, this file and its duties will get significantly larger and its hard to maintain.
// So we use redux tool kit
import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialState = {
  showCounter: true,
  counter: 0,
};

// When we have different states that are not directly related we can use different slices.
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  // Here WE CAN mutate our state obj. redux toolkit will take care of bugs for us.
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

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state){
      state.isAuthenticated = true;
    },
    logout(state){
      state.isAuthenticated = false;
    }
  }
});

// One way of passing reducer methods to store is like this. note that here is called "reducer" and in the createSlice argument is "reducers"
// const store = createStore(counterSlice.reducer);

// If we had more than one slice, we have multiple reducer objects to add to store.
// but note that redux always wants one "reducer" object containing all of our reducer methods.
// We need to create out store like this, all of reducer objects that we pass as "reducer" object properties, are object containing reducer methods.

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

// This object contains our reducer methods and we can use them safely.
export const counterAction = counterSlice.actions;
export const authAction = authSlice.actions;

export default store;
