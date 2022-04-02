import React from 'react';
import BackwardCounter from './components/BackwardCounter';
import ForwardCounter from './components/ForwardCounter';

// Why we need custom hooks ?
// We can't use React hooks in any function. we can use them in component functions and custom hooks
// here we want to refactor Forward and Backward into one function but both of them use hooks.
// We have to use custom hooks to do that.
function App() {
  return (
    <React.Fragment>
      <ForwardCounter />
      <BackwardCounter />
    </React.Fragment>
  );
}

export default App;
