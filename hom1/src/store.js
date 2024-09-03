import { configureStore } from "@reduxjs/toolkit";
import { medicineReducer } from "./features/medicine.slice";

export const store = configureStore({
    reducer: medicineReducer,
});
