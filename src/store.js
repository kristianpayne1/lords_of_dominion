import { configureStore } from "@reduxjs/toolkit";
import buildingsSlice from "./reducers/buildingsSlice";

export const store = configureStore({
    reducer: { buildings: buildingsSlice },
});
