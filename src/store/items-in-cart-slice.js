import { createSlice } from "@reduxjs/toolkit";
// {
//     title: "", price: "", totalPrice: "", amount: "0"
// }
const findItemOnTitle = (stateItemsInCart, title) => {
    return stateItemsInCart.find((item) => item.title === title);
};

const itemsInCartSlice = createSlice({
    name: "itemsInCart",
    initialState: {
        itemsInCart: [],
        amountItemsInCart: 0,
        isItemInCart: false,
        isCartOpen: false,
    },
    reducers: {
        addItem(state, action) {
            state.isItemInCart = true;
            const itemInCart = findItemOnTitle(
                state.itemsInCart,
                action.payload.title
            );

            if (itemInCart) {
                itemInCart.amount = itemInCart.amount + action.payload.amount;
                itemInCart.totalPrice =
                    itemInCart.amount * action.payload.price;
            } else {
                state.itemsInCart.push({
                    title: action.payload.title,
                    price: action.payload.price,
                    amount: action.payload.amount,
                    totalPrice: action.payload.amount * action.payload.price,
                });
            }
            state.amountItemsInCart = state.itemsInCart.reduce(
                (acc, item) => (acc = acc + item.amount),
                0
            );
        },
        decrementItem(state, action) {
            const itemInCart = findItemOnTitle(
                state.itemsInCart,
                action.payload
            );
            itemInCart.amount--;
            state.amountItemsInCart--;
            itemInCart.totalPrice = itemInCart.amount * itemInCart.price;
            if (itemInCart.amount === 0) {
                state.itemsInCart = state.itemsInCart.filter(
                    (item) => item.amount != 0
                );
                if (state.itemsInCart.length === 0) {
                    state.isItemInCart = false;
                }
            }
        },
        incrementItem(state, action) {
            const itemInCart = findItemOnTitle(
                state.itemsInCart,
                action.payload
            );
            itemInCart.amount++;
            state.amountItemsInCart++;
            itemInCart.totalPrice = itemInCart.amount * itemInCart.price;
        },
        toggleShowCart(state) {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const itemsInCartSliceActions = itemsInCartSlice.actions; //экспорт в компоненты

export default itemsInCartSlice.reducer; //экспорт в стор
