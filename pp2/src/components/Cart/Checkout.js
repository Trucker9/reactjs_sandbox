import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  // VALIDATING ALL AT ONCE (poor validation)
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const inputIsEmpty = {
      name: nameInputRef.current.value.trim() === '',
      street: streetInputRef.current.value.trim() === '',
      postal: postalInputRef.current.value.trim() === '',
      city: cityInputRef.current.value.trim() === '',
    };
    setFormValidity({
      name: !inputIsEmpty.name,
      street: !inputIsEmpty.street,
      postal: !inputIsEmpty.postal,
      city: !inputIsEmpty.city,
    });
    let formIsValid = true;
    Object.keys(inputIsEmpty).forEach((key) => {
      if (inputIsEmpty[key]) formIsValid = false;
    });

    if (!formIsValid) {
      return;
    }
  };

  const css_nameControlClasses = `${classes.control} ${
    formValidity.name ? '' : classes.invalid
  }`;

  const submitOrder = ()=>{
    props.onSubmitOrder({
     name:  nameInputRef.current.value,
      street: streetInputRef.current.value,
      postal: postalInputRef.current.value,
      city: cityInputRef.current.value,
    });
  }
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={css_nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p> Not valid</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.street && <p> Not valid</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValidity.postal && <p> Not valid</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p> Not valid</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={submitOrder}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
