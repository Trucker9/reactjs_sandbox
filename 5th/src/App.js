import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  /*
  If components runs again, will each time we get a new state ?
  no. states attach to a component when its created and if the line below gets executed for second time, react uses the 
  state that created before for this component. 
  */
  const [showParagraph, setShowParagraph] = useState(false);

  console.log('APP RUNNING');

  /* To prevent what happened in the last commit, we have useCallback.
  we can store a function of a component in some place of React memory, and when ever the component runs again, React
  does not create a new function for that. instead uses that saved function in the memory from the past.
  now when Reacts compares toggleParagraphHandlers from last run and current run, they are the same. so nothing changes
  from Button component and it wont get re evaluated because it has React.memo()
  useCallback gets another argument, array of dependencies similar to useEffect.
  with it being empty, we tell React that the toggleParagraphHandler
  never will change and always use what you've saved in memory.
  */
  // const toggleParagraphHandler = useCallback(() => {
  //   setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  // });

  /* We now function have closures.
  Here it means that when the toggleParagraph handler is created by Java script, a copy of "booleanThatMightChange" will
  be stored in it as well due to closures.
  So if we now apply useCallback here, this function will be created once, and the value of booleanThatMightChange will remain
  the same as the time when toggleParagraphHandler was created. now if we change the boolean in some state for example,
  it wont make any difference.
  Solution: add booleanThatMightChange to the dependencies. this tells react that we want to store the function, but
  if the dependencies changed, you have to re create this function and store it again. 
  */
  let booleanThatMightChange = true; 
  const toggleParagraphHandler = useCallback(() => {
    if (booleanThatMightChange) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  });

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/* 3 Things cause re-evaluation
      1.state change
      2.props change
      3. context change
      by re evaluating, component function re runs. so all the child components re run too. to prevent this
      useless behavior of React, we use memo.
      We apply this on DemoOutput*/}
      <DemoOutput show={false} />

      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;


// Summary
// by re re rendering, the component function runs again and all it child components run again
// we can avoid unnecessarily component runs by using memo
// memo runs the components if props change
// props change can happen if we pass function to the component because functions are compared with ===
// we can avoid that with useCallback but we have to be careful about dependencies and closures.