import React from 'react';
import css from './Input.module.css';

// ref argument is what we passed to the Input component as attribute "ref" where we used it. (see MealItemForm.js)
const Input = React.forwardRef((props, refFromParentComponent) => {
  return (
    <div className={css.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {
        // Add input details from the parent component.
      }
      <input ref={refFromParentComponent} {...props.input} />
    </div>
  );
});

export default Input;
