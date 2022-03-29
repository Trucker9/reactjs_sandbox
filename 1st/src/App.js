import React, { useState } from "react";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  // We have to use state for this, because we want to re-evaluate this function each time we add new item!
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  // JSX MAGIC
  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, { items: expenses })
  // );

  const addExpenseHandler = (expense) => {
    // This is not a good practice because we are updating state based on last state!
    // setExpenses([expense, ...expenses]);
    setExpenses(function (prevExpenses) {
      return [expense, ...prevExpenses];
    });
  };

  /* NOTE
              App
            /     \
  New Expense   Expenses

  if we want to pass data between sibling elements, we lift it up from one element then we send it down with props to the other elements


    */
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
