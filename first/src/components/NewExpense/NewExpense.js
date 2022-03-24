import React from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {



  // Trying to send data from child to parent, they way it works is that we send a custom function as props to child element 
  // Then we call that function whenever we want in the child element. REMEMBER: no child or parent can be skipped. this must be done level by level
  const saveExpenseDataHandler = (enteredExpenseData)=>{
    const toSaveData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    // console.log(toSaveData);
    props.onAddExpense(toSaveData);
  }


  

  return (
    <div className='new-expense'>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
