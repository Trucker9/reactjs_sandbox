import {createSlice} from '@reduxjs/toolkit';

const initialCartState = {
    show: false,
    items: [
        { title: 'Test1', quantity: 3, total: 18, price: 6 },
    ],
}

const cartSlice = createSlice({
name: 'cart',
initialState: initialCartState,
reducers: {
    toggleCart: (state) => {
        state.show = !state.show;
    },
    addItem: (state, action) => {
        const title = action.payload.title;
        const price = action.payload.price;

        const itemIndex = state.items.findIndex(item => item.title === title);
        if (itemIndex === -1){
            console.log("item not found");
            state.items.push({title: title, quantity: 1, total: price, price: price});
        }else {
            state.items[itemIndex].quantity += 1;
            state.items[itemIndex].total += price;
        }

    },
    removeItem: (state, action) => {
        const title = action.payload.title;
        const itemToRemove = state.items.find(item => item.title === title);
        if(itemToRemove.quantity > 1){
            itemToRemove.quantity -= 1;
            itemToRemove.total -= itemToRemove.price;
        }
        else{
            state.items.splice(state.items.indexOf(itemToRemove), 1);
        }
    },
}
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
