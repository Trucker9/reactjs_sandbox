import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// Can be created out side of the scope of component function because it doesn't need interact with anything inside component function.
// all the data's will be sent to this function by React.
const emailReducer = (lastState, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: action.val.includes("@") };

  if (action.type === "INPUT_BLUR")
    // here we have access to last state snapshot which is guaranteed to be safe.
    return { value: lastState.value, isValid: lastState.value.includes("@") };

  // Default
  return { value: "", isValid: false };
};
const passwordReducer = (lastState, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: action.val.trim().length > 6 };

  if (action.type === "INPUT_BLUR")
    // here we have access to last state snapshot which is guaranteed to be safe.
    return {
      value: lastState.value,
      isValid: lastState.value.trim().length > 6,
    };

  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // emailState: actual state to work with
  // dispatchEmail: a function to trigger emailReducer with some action
  // useReducer( ,arg2, ): arg2 is the initial action for emailReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  /* 
  useEffect Usage 2: running a function in case that some dependencies changed.
  Generally we use "useEffect" to run a piece of code in response to something. (not on each component update)
  NOTE: You must add all "things" you use in your effect function if those "things" could change because your component 
  (or some parent component) re-rendered. That's why variables or state defined in component functions,
   props or functions defined in component functions have to be added as dependencies
  */
  // useEffect(() => {
  //   setFormIsValid(
  //     enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //   );
  // }, [enteredEmail, enteredPassword]);

  /*
  useEffect Usage 3: running setFormIsValid after a delay with clean-up function.(actual usage is for HTTP requests.)
  when user stops typing for 1 second, we want to run a function
  When useEffect returns a function we call it the clean up function. the returned function will execute in between useEffect
  runs. or in the other words, before each useEffect except the first one. with every key stroke, dependencies change and useEffect runs. we make a setTimeOut function with 1s timer. if user types another letter, useEffect will run again and creates another setTimeout function which we dont want, so we clear the last timer in clean up and create new one. therefore after 1s from the time that user entered the last letter, we run what is in setTimeOut.
  */
 
  const {isValid : emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      /* Setting form validation like this is more secure, because at line 104 and 98, we rely on previous sates which
       is not ideal. here we relying on those too but useEffect runs after each time that the dependencies change,
       so we always have the latest state of those too. */
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 1000);
    return () => {
      // console.log("Running cleanUp");
      clearTimeout(identifier);
    };
    // There is problem here, we run useEffect each time that the state changes. this includes value changes. but we want to run
    // useEffect each time that validity changes because we are checking for validity. so we do it like so
  // }, [emailState, passwordState]);
    }, [emailIsValid, passwordIsValid]);

  /* 
  useEffect summary: 
  1. useEffect(f): f runs each time the component renders
  2. useEffect(f, []): f runs only for the first time that components renders. 
  3. useEffect(f, [dependency1, dependency2]): runs for each time component renders or when dependencies change.
  4. if "f" returns a function, its clean-up function and runs between useEffect runs.

  */

  const emailChangeHandler = (event) => {
    // Triggers the reducer function and send the argument as its action.
    const action = { type: "USER_INPUT", val: event.target.value };
    dispatchEmail(action);
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    const action = { type: "USER_INPUT", val: event.target.value };
    dispatchPassword(action);
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    /* 
    Here we are updating state based on some other states which can make bugs.
    when we wanted to update state based in previous state,
    we used call back function which here is not the case since 
    the updating state and the state we are checking are not the same.
    WHEN STATES BECOME COMPLEX WE USE useReducer();
    */
    // setEmailIsValid(emailState.isValid);
    const action = { type: "INPUT_BLUR" }; // blur -> lost focus.
    dispatchEmail(action);
  };

  const validatePasswordHandler = () => {
    const action = { type: "INPUT_BLUR" };
    dispatchPassword(action);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
