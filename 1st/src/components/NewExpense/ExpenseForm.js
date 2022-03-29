import React from "react";
import { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  // Here we are adding these properties to state, so we can pick them up later, and nothing happens to them when this function gets re-evaluated.
  // Basically we dont want to lose them.

  // ------------------------------------------------ APPROACH 1
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  // // ------------------------------------------------ APPROACH 2 (setting multiple states)
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  // const titleChangeHandler = (event) => {
  //   // setUserInput({
  //   //     // setUserInput replaces the old state object with the new one.
  //   //     // We need to update one field of the object, so we pass the whole object with "...userInput", then overwrite one field
  //   //     ...userInput,
  //   //    enteredTitle: event.target.value
  //   //    });

  //   // There was a problem above, whenever we want to update the state such that the current state relies on previous state, we have to use a callback function.
  //   // Reason: React schedules updates, and its possible that they appear at the same time, so when we use a call-back function,
  //   // the React will guarantee that it happens correctly
  //   setUserInput((prevState) => {
  //     return { ...prevState, enteredTitle: event.target.value };
  //   });
  // };

  // const amountChangeHandler = (event) => {
  //   setUserInput((prevState) => {
  //     return { ...prevState, enteredAmount: event.target.value };
  // });

  // const dateChangeHandler = (event) => {
  //   setUserInput((prevState) => {
  //     return { ...prevState, enteredDate: event.target.value };
  // });

  const submitHandler = (e) => {
    // just search for this
    e.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    // Saving data (a function from parent)
    props.onSaveExpenseData(expenseData);
    // console.log(expenseData);

    // Clearing input
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredTitle("");
  };

  return (
    // When ever a button on a from gets pressed, the form will emit an submit event which we gonna listen to
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>

          <input
            type="text"
            /* Clearing Input:
             When form is submitted, state changes and function gets re-evaluated.
             form will uses enteredTitle as default value (which we manually cleared at the top) */
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
