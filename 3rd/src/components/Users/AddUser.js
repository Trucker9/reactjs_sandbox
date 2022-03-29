import React, { useRef, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  /*
  For reading input, we used state, we changed the state with onChang={} and then read the state. after that we fed the state value
  back to the HTML element. (controlled).
  this is not efficient, so we use refs.(in cases which we only want to read a value and not changing anything. changing DOM must be done with react)
  with refs, we can have a pointer to the actual HTML element as DOM node object.
  first we create ref, then we add the ref={} to HTML input, 
  DOM element will be saved to ref. it has a current object which is actually DOM node object.
  then we can read the value of it.
  ⚠ : Doing this results in uncontrolled HTML element because we dont feed back the result.
  */
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName_ref = nameInputRef.current.value;
    const enteredAge_ref = ageInputRef.current.value;
    if (
      enteredName_ref.trim().length === 0 ||
      enteredAge_ref.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge_ref < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName_ref, enteredAge_ref);
    // Resetting values. (not a common thing to manipulate DOM)
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
