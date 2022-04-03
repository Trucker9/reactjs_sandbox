import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  /*   // If we want to use the value once, we can use useRef.
  const nameInRef = useRef();
  const formSubmissionHandler = (e) => {
    e.preventDefault();
    console.log(nameInRef.current.value);
  };
*/
  // For using input with every key stroke for example validation, its better to use state.
  // We have better control with state
  const [enteredName, setEnteredName] = useState('');
  const nameInChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const formSubmissionHandler = (e) => {
    e.preventDefault();
    console.log(enteredName);
    setEnteredName('');
  };

  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          //  ref={nameInRef}
          onChange={nameInChangeHandler}
          type="text"
          id="name"
          // Feeding back
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button onClick={formSubmissionHandler}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
