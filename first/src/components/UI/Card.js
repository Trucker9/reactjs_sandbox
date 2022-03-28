import React from 'react';

import './Card.css';

const Card = (props) => {
  // classNames that we pass to <Card /> will be available here. then we set them to the wrapper div.
  const classes = 'card ' + props.className;
  console.log(classes);
  // everything that is between <Card> <Card/> will be replaced with props.children
  // Basically we are wrapping all the content into "div" because we cannot return more than one HTML element that are siblings like what we've done in ExpenseItem.js
  return <div className={classes}> {props.children} </div>;
};

export default Card;
