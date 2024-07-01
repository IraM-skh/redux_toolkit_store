import { configureStore } from "@reduxjs/toolkit";

import itemSlice from "./item-slice";
import itemsInCartSlice from "./items-in-cart-slice";

const store = configureStore({
    reducer: {
        item: itemSlice,
        itemsInCart: itemsInCartSlice,
    },
});

export default store;
