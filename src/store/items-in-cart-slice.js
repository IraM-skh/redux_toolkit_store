import { createSlice } from "@reduxjs/toolkit";
import { fetchStatusSliceActions } from "./fetch-status";
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
        isCarUnpdate: false,
    },
    reducers: {
        addItem(state, action) {
            state.isItemInCart = true;
            state.isCarUnpdate = true;
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
            state.isCarUnpdate = true;
            const itemInCart = findItemOnTitle(
                state.itemsInCart,
                action.payload
            );
            itemInCart.amount--;
            state.amountItemsInCart--;
            itemInCart.totalPrice = itemInCart.amount * itemInCart.price;
            if (itemInCart.amount === 0) {
                state.itemsInCart = state.itemsInCart.filter(
                    (item) => item.amount !== 0
                );
                if (state.itemsInCart.length === 0) {
                    state.isItemInCart = false;
                }
            }
        },
        incrementItem(state, action) {
            state.isCarUnpdate = true;
            const itemInCart = findItemOnTitle(
                state.itemsInCart,
                action.payload
            );
            itemInCart.amount++;
            state.amountItemsInCart++;
            itemInCart.totalPrice = itemInCart.amount * itemInCart.price;
        },
        toggleShowCart(state) {
            state.isCarUnpdate = false;
            state.isCartOpen = !state.isCartOpen;
        },
        updateCart(state, action) {
            state.isCarUnpdate = false;
            state.itemsInCart = action.payload;
            state.amountItemsInCart = state.itemsInCart.reduce(
                (acc, item) => (acc = acc + item.amount),
                0
            );
        },
    },
});

//Кастомная функция action-creater
export const sendCartDataAC = (cartData) => {
    return async (dispatchFun) => {
        dispatchFun(
            fetchStatusSliceActions.showStatusMessage({
                status: "pending",
                title: "Отправка данных",
                message: "Данные заказа отправляются на сервер...",
            })
        );
        const sendHttpRequest = async () => {
            const response = await fetch(
                "https://react-course-http-30914-default-rtdb.firebaseio.com/cart.json",
                { method: "PUT", body: JSON.stringify(cartData) }
            );

            if (!response.ok) {
                throw new Error("Ошибка при отправке данных заказа");
            }
        };

        try {
            await sendHttpRequest();
            dispatchFun(
                fetchStatusSliceActions.showStatusMessage({
                    status: "success",
                    title: "Данные отправленны",
                    message: "Данные отправлены!",
                })
            );
        } catch (error) {
            dispatchFun(
                fetchStatusSliceActions.showStatusMessage({
                    status: "error",
                    title: "Ошибка запроса",
                    message: "Ошибка при отправке данных заказа.",
                })
            );
        }
    };
};
export const itemsInCartSliceActions = itemsInCartSlice.actions; //экспорт в компоненты
export const getCartData = () => {
    return async (dispatchFun) => {
        const getDataHttpRequest = async () => {
            const response = await fetch(
                "https://react-course-http-30914-default-rtdb.firebaseio.com/cart.json"
            );

            if (!response.ok) {
                throw new Error("Невозможно исзвлеч данные");
            }
            const responseData = await response.json();
            return responseData;
        };

        try {
            let cartData = await getDataHttpRequest();
            if (cartData === null) {
                cartData = [];
            }
            dispatchFun(itemsInCartSliceActions.updateCart(cartData));
        } catch (error) {
            dispatchFun(
                fetchStatusSliceActions.showStatusMessage({
                    status: "error",
                    title: "Ошибка запроса",
                    message: "Ошибка при отправке данных заказа.",
                })
            );
        }
    };
};

export default itemsInCartSlice.reducer; //экспорт в стор
