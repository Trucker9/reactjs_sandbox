import { useReducer } from 'react';
import CardContext from './cart-context';

const defState = { items: [], totalAmount: 0 };
// Here we create a brand new state object and return it. we can use the old state object if we want to keep the old state data.
const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    // calculate the total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // figure out if the item is already in the cart and find the index of the item if it is in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // find the item in the list with its index
    const existingCartItem = state.items[existingCartItemIndex];
    // if the item is already in the cart, we want to update the amount of the item in the cart
    let updatedCartItem;
    let updatedCartItems;
    if (existingCartItem) {
      updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      // create a new array of cart items with previous cart
      updatedCartItems = [...state.items];
      // replace the updated item.
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItem = { ...action.item };
      updatedCartItems = state.items.concat(updatedCartItem);
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedCartItems;
    // if it's the last one we want to remove the item from the cart
    if (existingCartItem.amount === 1) {
      // filter : remove the element if the given function returns false (wtf man) 
      updatedCartItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedCartItem = {...existingCartItem, amount: existingCartItem.amount - 1};
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }
    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defState;
};

const CartProvider = (props) => {
  // We want to re evaluate this component and components within it whenever the cart changes (adding or removing items) so we use useReducer
  const [state, dispatch] = useReducer(cartReducer, defState);

  const addItemHandler = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
  };
  const removeItemHandler = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  // The object that holds the cart data
  const cardContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CardContext.Provider value={cardContext}>
      {props.children}
    </CardContext.Provider>
  );
};
// Now we can wrap every component that needs the data of cart context  with the cart provider
export default CartProvider;
