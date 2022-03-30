import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

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
  useEffect(() => {
    const identifier = setTimeout(() => {
      // console.log("Running setFormIsValid");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 1000);
    return () => {
      // console.log("Running cleanUp");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  /* 
  useEffect summary: 
  1. useEffect(f): f runs each time the component renders
  2. useEffect(f, []): f runs only for the first time that components renders. 
  3. useEffect(f, [dependency1, dependency2]): runs for each time component renders or when dependencies change.
  4. if "f" returns a function, its clean-up function and runs between useEffect runs.

  */




  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
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
