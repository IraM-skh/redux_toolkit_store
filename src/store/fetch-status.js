import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
    name: "fetchStatus",
    initialState: { statusMessage: null },
    reducers: {
        showStatusMessage(state, action) {
            state.statusMessage = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    },
});

export const fetchStatusSliceActions = fetchStatusSlice.actions; //экспорт в компоненты

export default fetchStatusSlice.reducer; //экспорт в стор
