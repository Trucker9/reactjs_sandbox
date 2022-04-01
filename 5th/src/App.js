import React, { useState } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log('APP RUNNING');

  const toggleParagraphHandler = () => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  };
 
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
