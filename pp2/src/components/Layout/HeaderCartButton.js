import { useContext, useEffect, useState } from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

import cartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(cartContext);
  const itemsNo = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  const { items } = cartCtx;
  // If items changed, we want to change the state of the button to add the bump class.
  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);
    // after 300ms, we want to remove the bump class.
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    // clear the timer if we need to create a new timer.(if we change the items array)
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart </span>
      <span className={classes.badge}>{itemsNo}</span>
    </button>
  );
};

export default HeaderCartButton;
