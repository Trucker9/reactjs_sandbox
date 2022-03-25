import React from "react";
import { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  console.log(props.items);
  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {props.items.map((expense) => {
        return(<ExpenseItem
          // Key, helps react to determine which item in the list is being updated and prevents updating the whole list when only one item is being added. (performance improvements + less bugs)
          // If we dont add key, each time that reacts wants to update the HTML, it will recreate the list. 
          key= {expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />);
      })}
    </Card>
  );
};

export default Expenses;
