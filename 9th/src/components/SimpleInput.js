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
  /* This causes a problem. if we use useEffect and check if(nameIsValid) {},
   at the beginning, although we have no input, we execute the if block!
   totally its not a good practice to say nameIsValid when its empty (logically) */
  const [nameIsValid, setNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  
  // if its touched and is invalid, we show the error message.
  const nameIsInvalid = !nameIsValid && enteredNameTouched;

  const nameInChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
    if (enteredName.trim() === '') {
      setNameIsValid(false);
      return;
    }
    setNameIsValid(true);
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setNameIsValid(false);
      return;
    }
    setNameIsValid(true);
    
    setEnteredName('');
  };

  return (
    <form>
      {/* If name is invalid we add 'invalid' class.*/}
      <div className={`form-control ${nameIsInvalid && 'invalid'}`}>
        <label htmlFor="name">Your Name</label>
        <input
          //  ref={nameInRef}
          onChange={nameInChangeHandler}
          onBlur={nameInputBlurHandler}
          type="text"
          id="name"
          // Feeding back
          value={enteredName}
        />
      </div>
      {!nameIsInvalid ? '' : <p className="error-text">Invalid name</p>}
      <div className="form-actions">
        <button onClick={formSubmissionHandler}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
