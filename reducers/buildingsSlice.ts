import { BuildingState, BuildingTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BuildingState = [];

export const buildingsSlice = createSlice({
    name: "buildings",
    initialState,
    reducers: {
        addBuilding: (state, { payload = {} }) => {
            const {
                type = BuildingTypes,
                variant = Math.round(Math.random() * 2) + 1,
                level = 1,
            } = payload;
            state.push({ variant, level, type });
        },
    },
});

export const { addBuilding } = buildingsSlice.actions;

export default buildingsSlice.reducer;
