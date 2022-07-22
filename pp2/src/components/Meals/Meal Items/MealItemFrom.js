import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import css from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +amountInputRef.current.value;
    
    if(enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 50) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmount);

  }
  const inputDetails = {
    id: 'amount_' + props.id,
    type: 'number',
    min: 1,
    max: 5,
    step: 1,
    defaultValue: 1,
  };
  return (
    <form className={css.form} onSubmit={formSubmitHandler}>
      {/* ref won't work on this custom component. some adjustments needs to be done in "Input" component below.  */}
      <Input ref={amountInputRef} label="Amount" input={inputDetails} />
      <button> + Add</button>
      {!amountIsValid && <p>Amount is not valid</p>}
    </form>
  );
};

export default MealItemForm;
