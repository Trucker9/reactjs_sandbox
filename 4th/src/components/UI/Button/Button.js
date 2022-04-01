import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
// NOTE: this causes overhead of comparing.
// we usually use this when we now a component is not going to change often like this button.
// NOTE: if DemoOutput is not changing, its not running then MyParagraph is not running either.
export default React.memo(Button);
