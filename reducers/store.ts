import { configureStore } from "@reduxjs/toolkit";
import buildingsSlice from "./buildingsSlice";

export const store = configureStore({
    reducer: { buildings: buildingsSlice },
});
