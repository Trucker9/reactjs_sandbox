import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';
import CardContext from '../../store/cart-context';

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



  const cartCtx = useContext(CardContext);

  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {' '}
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          /* Pre configuring these two methods to have access to item and item.id when being executed */
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkoutBtnHandler = () => {
    setShowForm(true);
  };
  const cancelSubmitHandler = () => {
    setShowForm(false);
  };

  const orderHandler = async (userData) => {
    setIsSubmitting(true);
   await fetch(
      'https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/in.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          order: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
  };
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutBtnHandler}>
          Checkout
        </button>
      )}
    </div>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span> {totalAmount} </span>
      </div>
      {showForm && (
        <Checkout onClose={cancelSubmitHandler} onSubmitOrder={orderHandler} />
      )}
      {!showForm && modalActions}
    </Modal>
  );
};

export default Cart;
