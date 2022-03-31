/* 
I DONNO WHO THE FUCK CREATED THIS, BUT ITS SOME HEAVY SHIT WHICH IMMA PASS
*/
import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

// React.forwardRef : creates a react component that is capable of being bound to a ref
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
  // arg1: ref from the JSX when we called this component. this ref value allow the connection from outside to inside.
  // arg2: a function which returns an object. this object contains internal data's of this component that we want to use outside.
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
