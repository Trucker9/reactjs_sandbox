// we Extract the data we need from store with useSelector. we dont use the whole store.
import { useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  // This function gets the whole state and returns what we are interested in.
  const extractorFn = (state) => {
    return state.counter;
  };
  // Extracting data from store with useSelector and extractorFn.
  // useSelector automatically subscribes this component to the store.
  // by subscribing, whenever the counter (or generally the data) changes in the redux store, the component will be updated with the latest value.
  // Changes to the redux store will cause this component to run again and show the latest counter.
  // if we unmount this component, the subscription will be removed automatically. 
  const counterValue = useSelector(extractorFn);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>-- {counterValue} --</div>
      <div>
        <button>Increment</button>
        <button>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
