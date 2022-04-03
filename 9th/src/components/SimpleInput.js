import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  // const nameInRef = useRef();

  // const formSubmissionHandler = () => {
  //   console.log(nameInRef.current.value);
  // };

  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
        //  ref={nameInRef}
          type="text" id="name" />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
