import {useDispatch, useSelector} from 'react-redux';
import {cartActions} from '../../store/cart-slice';


import classes from './CartButton.module.css';
const CartButton = (props) => {

    const dispatch = useDispatch();
    const toggleCartHandler = () => {
        dispatch(cartActions.toggleCart());
    }
    const itemsNo = useSelector(state => state.items.reduce((acc, curr) => acc + curr.quantity, 0));

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsNo}</span>
    </button>
  );
};

export default CartButton;
