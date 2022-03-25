import React, { useState } from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  // Must be called directly into the component function.
  // It creates a special value that when changes, this function will be called again. by updating the state, the function that did it must be re-evaluated.
  // The initial value of the state is what we pass into the useState();
  // It returns an array where [0]= The current state value  & [1]= a function that can be called to update the value.
  const [title, setTitle] = useState(props.title);
  // NOTES:
  // 1. each component has separate state.
  // Initialization of an state only happens once, even though we may run this function multiple times when the state gets updated.

  const clickHandler = () => {
    console.log("Clicked!");
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>

      <button onClick={clickHandler} > Click me</button>
    </Card>
  );
};

export default ExpenseItem;
