import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {uiActions} from "./store/ui-slice";
import Notification from "./components/UI/Nitification";

// this variable will be created when the file is compiled.(not with each component render)
let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const notification = useSelector((state) => state.ui.notification);

    const cart = useSelector((state) => state.cart);
    // Functions passed to useEffect must return a clean-up function or nothing. we can't use async functions.(they
    // return promises)
    useEffect(() => {
            const sendCartData = async () => {
                dispatch(uiActions.setNotification({
                    status: 'pending',
                    title: 'Sending ...',
                    message: 'Please wait to send cart data'
                }));
                const response = await fetch('https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                    method: 'PUT',
                    body: JSON.stringify(cart)
                });

                if (!response.ok) {
                    throw new Error('Sending cart data failed!');
                }
                dispatch(uiActions.setNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'done'
                }));
                // const responseData = await response.json(); we dont need it though.
            }

            // prevent sending cart data on first render (app is being created)
            if (isInitial) {
                isInitial = false;
                return;
            }

            sendCartData().catch(err => {
                dispatch(uiActions.setNotification({
                    status: 'error',
                    title: 'Error! ...',
                    message: 'sending failed.'
                }));
                console.log(err);
            })
        }, // dispatch won't change (it's a redux function)
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
