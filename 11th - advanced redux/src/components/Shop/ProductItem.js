import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
    // 1
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const { title, price, description, id } = props;

    // Steps:
    // 1. get state from redux
    // 2. create brand-new state with the updated information.
    // 3. replace new state with old state with replaceCart() reducer function.
    // 4. send http request to the server.
    // Problem: transforming cart data is done in component function and redux just saves the data. (not optimal)
    const addToCartHandler = () => {
        // 2
        const newTotalQuantity = cart.totalQuantity + 1;
        // create copy via slice to avoid mutating original state (ONE MUST NEVER MUTATE THE REDUX STATE. EVER.)
        const updatedItems = cart.items.slice();
        const existingItem = updatedItems.find((item) => item.id === id);
        if (existingItem) {
            const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
            updatedItem.quantity++;
            updatedItem.totalPrice = updatedItem.totalPrice + price;
            const existingItemIndex = updatedItems.findIndex(
                (item) => item.id === id
            );
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems.push({
                id: id,
                price: price,
                quantity: 1,
                totalPrice: price,
                name: title,
            });
        }

        const newCart = {
            totalQuantity: newTotalQuantity,
            items: updatedItems,
        };
        // 3
        dispatch(cartActions.replaceCart(newCart));
        // 4
        fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

    };

    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;