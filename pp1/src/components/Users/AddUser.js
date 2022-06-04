import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUserName] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [err, setErr] = useState();

  const userNameChangeHandler = (e) => {
    setEnteredUserName(e.target.value);
  };

  const ageChangeHandler = (e) => {
    setEnteredAge(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.onAddUser(enteredUsername, enteredAge);

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setErr({ title: 'invalid username', msg: 'go fuck yourself' });
      return;
    }
    if (+enteredAge < 1) {
      setErr({ title: 'invalid age', msg: 'go fuck yourself' });
      return;
    }

    setEnteredAge('');
    setEnteredUserName('');
  };

  const closeErrModal = () =>{
    setErr(null);
  }
  return (
    <div>
      {err && <ErrorModal title={err.title} msg={err.msg} closeFunc={closeErrModal} />}

      <Card className={classes.input}>
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={userNameChangeHandler}
            value={enteredUsername}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={enteredAge}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
