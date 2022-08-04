
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter-slice';
import authReducer from './auth-slice';





// One way of passing reducer methods to store is like this. note that here is called "reducer" and in the createSlice argument is "reducers"
// const store = createStore(counterSlice.reducer);

// If we had more than one slice, we have multiple reducer objects to add to store.
// but note that redux always wants one "reducer" object containing all of our reducer methods.
// We need to create out store like this, all of reducer objects that we pass as "reducer" object properties, are object containing reducer methods.

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});



export default store;
