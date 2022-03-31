import React, { useEffect, useReducer, useState, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

const emailReducer = (lastState, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: action.val.includes("@") };

  if (action.type === "INPUT_BLUR")

    return { value: lastState.value, isValid: lastState.value.includes("@") };

  // Default
  return { value: "", isValid: false };
};
const passwordReducer = (lastState, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: action.val.trim().length > 6 };

  if (action.type === "INPUT_BLUR")

    return {
      value: lastState.value,
      isValid: lastState.value.trim().length > 6,
    };

  return { value: "", isValid: false };
};

const Login = () => {

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
 
  const {isValid : emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {

      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 1000);
    return () => {
      // console.log("Running cleanUp");
      clearTimeout(identifier);
    };
    }, [emailIsValid, passwordIsValid]);



  const emailChangeHandler = (event) => {
    const action = { type: "USER_INPUT", val: event.target.value };
    dispatchEmail(action);

  };

  const passwordChangeHandler = (event) => {
    const action = { type: "USER_INPUT", val: event.target.value };
    dispatchPassword(action);

  };

  const validateEmailHandler = () => {

    const action = { type: "INPUT_BLUR" }; 
  };

  const validatePasswordHandler = () => {
    const action = { type: "INPUT_BLUR" };
    dispatchPassword(action);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  const authCtx = useContext(AuthContext)
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
