import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const {
    value: fNameIn,
    isValid: fNameIsValid,
    hasError: fNameHasErr,
    valueChangeHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    reset: fNameReset,
  } = useInput((text) => text.trim() !== '');

  const {
    value: lNameIn,
    isValid: lNameIsValid,
    hasError: lNameHasErr,
    valueChangeHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    reset: lNameReset,
  } = useInput((text) => text.trim() !== '');

  const {
    value: emailIn,
    isValid: emailIsValid,
    hasError: emailHasErr,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((text) => text.includes('@'));

  const formIsValid = fNameIsValid && lNameIsValid && emailIsValid;
  const formSubmitHandler = (e) => {

    e.preventDefault();

    if (formIsValid){
      console.log(fNameIn, lNameIn, emailIn);
      fNameReset();
      lNameReset();
      emailReset();
    }


  };

  const inputClass = (hasErr) => {
    if (hasErr) return 'form-control invalid';
    return 'form-control ';
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={inputClass(fNameHasErr)}>
          <label htmlFor="name">First Name</label>
          <input
            onBlur={fNameBlurHandler}
            onChange={fNameChangeHandler}
            value={fNameIn}
            type="text"
            id="name"
          />
          {fNameHasErr && <p> Please enter valid first name. </p>}
        </div>
        <div className={inputClass(lNameHasErr)}>
          <label htmlFor="name">Last Name</label>
          <input
            onBlur={lNameBlurHandler}
            onChange={lNameChangeHandler}
            value={lNameIn}
            type="text"
            id="name"
          />
          {lNameHasErr && <p> Please enter valid last name. </p>}
        </div>
      </div>
      <div className={inputClass(emailHasErr)}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={emailIn}
          type="text"
          id="name"
        />
        {emailHasErr && <p> Please enter valid email. </p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
