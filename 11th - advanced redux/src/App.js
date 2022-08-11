import {useEffect} from "react";
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  /*
  * Approach 2:
  * 1. updating the redux store as usual
  * 2. send data to server.
  * transforming data logic stays in reducers.
  * */


  // Setting a subscription to the redux store.
  // when cart data changes, useSelector will make this component to rerender and show the latest cart data.
  const cart = useSelector((state) => state.cart);
    // useEffect sends the latest cart data to backend each time cart changes.
  useEffect(() => {
      fetch('https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/cart.json',{
            method: 'PUT',
            body: JSON.stringify(cart)
      } )
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
