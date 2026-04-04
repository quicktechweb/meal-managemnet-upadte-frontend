import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "../feature/cartSlice";
import mealReducer from "../feature/mealSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  meal: mealReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
