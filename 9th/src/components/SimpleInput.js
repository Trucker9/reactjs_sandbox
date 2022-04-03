import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  // If we want to use the value once, we can use useRef. 
  const nameInRef = useRef();
  const formSubmissionHandler = (e) => {
    e.preventDefault();
    console.log(nameInRef.current.value);
  };

  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
         ref={nameInRef}
          type="text" id="name" />
      </div>
      <div className="form-actions">
        <button onClick={formSubmissionHandler}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
