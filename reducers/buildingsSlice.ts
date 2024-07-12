import { createSlice } from "@reduxjs/toolkit";
import { HOUSE } from "../components/houses/types";

const initialState = [];

export const buildingsSlice = createSlice({
    name: "buildings",
    initialState,
    reducers: {
        addBuilding: (state, { payload = {} }) => {
            const {
                type = HOUSE,
                variant = Math.round(Math.random() * 2) + 1,
                level = 1,
            } = payload;
            state.push({ variant, level, type });
        },
    },
});

export const { addBuilding } = buildingsSlice.actions;

export default buildingsSlice.reducer;
