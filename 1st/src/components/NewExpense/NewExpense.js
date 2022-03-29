import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  // Trying to send data from child to parent, they way it works is that we send a custom function as props to child element
  // Then we call that function whenever we want in the child element. REMEMBER: no child or parent can be skipped. this must be done level by level
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const toSaveData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    // console.log(toSaveData);
    props.onAddExpense(toSaveData);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
