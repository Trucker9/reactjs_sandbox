import {configureStore} from "@reduxjs/toolkit";
import cartSliceReducerObject from "./cart-slice";

const store = configureStore({
reducer: cartSliceReducerObject,
});

export default store;