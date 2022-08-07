import classes from './CartItem.module.css';
import {cartActions} from "../../store/cart-slice";
import {useDispatch} from "react-redux";

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;

  const dispatch = useDispatch();

  const addOneHandler = () => {
    dispatch(cartActions.addItem({title, price, quantity: 1}));
  };

  const removeOneHandler = () => {
    dispatch(cartActions.removeItem({title, price, quantity: 1}));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={addOneHandler}>+</button>
          <button onClick={removeOneHandler}>-</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
