import { configureStore } from "@reduxjs/toolkit";

import itemSlice from "./item-slice";
import itemsInCartSlice from "./items-in-cart-slice";
import fetchStatusSlice from "./fetch-status";

const store = configureStore({
    reducer: {
        item: itemSlice,
        itemsInCart: itemsInCartSlice,
        fetchStatus: fetchStatusSlice,
    },
});

export default store;
