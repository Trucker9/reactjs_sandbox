import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
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
  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
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
