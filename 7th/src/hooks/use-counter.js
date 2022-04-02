import { useState, useEffect } from 'react';
// in custom hooks:
// Function name MUST start with use.
// This signals react that in this normal function we are following hooks rules.
// Now we can use stateful logic here and use React hooks.
const useCounter = (forwards = true) => {
  /*Here we are using state, in each component that we use this hooks, that component
    gets its own state and that state gets tied to the component.*/
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) setCounter((prevCounter) => prevCounter + 1);
      else setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  },
  // Here forwards won't change after starting but maybe in some other components we changed it.
  // Then of course we want the interval function to change accordingly.
  [forwards]);

  // To use it in components
  return counter;
};

export default useCounter;
