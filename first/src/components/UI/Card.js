import React from 'react';

import './Card.css';

const Card = (props) => {
  // classNames that we pass to <Card /> will be available here. then we set them to the wrapper div.
  const classes = 'card ' + props.className;
  // everything that is between <Card> <Card/> will be replaced with props.children
  return <div className={classes}> {props.children} </div>;
};

export default Card;
