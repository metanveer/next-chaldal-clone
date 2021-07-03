import { configureStore } from "@reduxjs/toolkit";
import cartItemsSlice from "../features/cartItems/cartItemsSlice";
import toggleCartReducer from "../features/toggleCart/toggleCartSlice";

export const store = configureStore({
  reducer: {
    toggleCart: toggleCartReducer,
    cartItems: cartItemsSlice,
  },
});
