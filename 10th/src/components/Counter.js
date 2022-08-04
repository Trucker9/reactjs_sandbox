// we Extract the data we need from store with useSelector. we dont use the whole store.
import { useSelector, useDispatch } from 'react-redux';
import { counterAction } from '../store/counter-slice';

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();

  /*
   state -> redux store 
    counter -> counter slice (this is the key of the slice that we passed its reducer object to configureStore)
    counter -> value of "counter" variable in slice
  */
  const counterValue = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const incHandler = () => {
    dispatch(counterAction.increment());
  };
  const decHandler = () => {
    dispatch(counterAction.decrement);
  };
  const IncreaseHandler = () => {
    // What counterAction.increase(5) return?
    /* {
      type: 'SOME_UNIQUE_ID',
      payload: 'argument of reducer we chose',
    }*/
    dispatch(counterAction.increase(5));
  };
  const toggleCounterHandler = () => {
    dispatch(counterAction.toggleCounter());
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>-- {counterValue} --</div>}
      <div>
        <button onClick={incHandler}>Increment</button>
        <button onClick={IncreaseHandler}>Increase by 5</button>
        <button onClick={decHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
