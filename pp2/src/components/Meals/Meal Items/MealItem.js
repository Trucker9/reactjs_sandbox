import { useContext } from 'react';

import css from './MealItem.module.css';
import MealItemForm from './MealItemFrom.js';
import  CartContext  from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={css.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={css.description}>{props.description}</div>
        <div className={css.price}> {price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
