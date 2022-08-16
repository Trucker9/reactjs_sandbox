import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import Notification from "./components/UI/Nitification";
import {sendCartData, fetchCartData} from "./store/cart-actions";

// this variable will be created when the file is compiled.(not with each component render)
let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const notification = useSelector((state) => state.ui.notification);

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCartData());
    }, []);

    useEffect(() => {
            if (isInitial) {
                isInitial = false;
                return;
            }
            if (cart.d) {
                dispatch(sendCartData(cart));
            }

        },
        [cart, dispatch]);

    return (
        <Fragment>
            {notification &&
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}/>}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </Fragment>
    );
}

export default App;
