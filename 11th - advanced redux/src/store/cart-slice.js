import {createSlice} from '@reduxjs/toolkit';
import {uiActions} from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
            }
        },
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
    },
});

// WE NEED REDUCERS TO DO SOME SIDE EFFECTS AND THEN PERFORM SOME ACTIONS. WE USE ACTION CREATORS.

// we are going to use this pattern. (using Action Creators)
// first we do some work then we dispatch our action.
//
// const actionCreatorFunc = (args) => {
//
//     --What we want to do--
//
//     return function (dispatch) {
//         dispatch( --actual action--);
//     }
// };


// Later we call this function in "useEffect() of app.js"
// basically in app.js we call actions, which return action objects for the store to do some work.
// but with help of redux toolkit, we call a function that returns another function. then we are allowed to
// perform some side effects.  it gets the dispatch function as an argument. so we can dispatch our actual action.
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


export const cartActions = cartSlice.actions;

export default cartSlice;