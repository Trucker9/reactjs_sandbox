import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
    // doing some work, then calling dispatch...
    return async dispatch => {

        const fetchData = async () => {
            const res = await fetch('https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
            if (!res.ok) throw new Error(`Could not fetch cart data. Status: ${res.status}`);
            return await res.json();
        }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (e) {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error! ...',
                message: e.message
            }));
        }

    }
}

export const sendCartData = (cart) => {

    return async function (dispatch) {
        dispatch(uiActions.setNotification({
            status: 'pending',
            title: 'Sending ...',
            message: 'Please wait to send cart data'
        }));

        const sendReq = async () => {
            const response = await fetch('https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed!');
            }
        }
        try {
            await sendReq();
        } catch (err) {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error! ...',
                message: 'sending failed.'
            }));
        }


        dispatch(uiActions.setNotification({
            status: 'success',
            title: 'Success!',
            message: 'done'
        }));

    }
};

