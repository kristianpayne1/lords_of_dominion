import { configureStore } from "@reduxjs/toolkit";
import buildingsSlice from "../../src/reducers/buildingsSlice";

export const store = configureStore({
    reducer: { buildings: buildingsSlice },
});
