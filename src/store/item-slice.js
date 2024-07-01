import { createSlice } from "@reduxjs/toolkit";
const items = [
    {
        title: "Супер-Товар",
        price: 7,
        description:
            "Благодаря своему высокому качеству, этот товар прослужит вам очень долго.",
    },
    {
        title: "Обычный товар",
        price: 3,
        description: "Обычный товар, хорошее соотношение цена-качество.",
    },
];

const itemSlice = createSlice({
    name: "items",
    initialState: { items },
    reducers: {
        logIn(state) {
            state.isUserLoggedIn = true;
        },
        signOut(state) {
            state.isUserLoggedIn = false;
        },
    },
});

export const itemSliceActions = itemSlice.actions; //экспорт в компоненты

export default itemSlice.reducer; //экспорт в стор
