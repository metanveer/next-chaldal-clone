import { configureStore } from "@reduxjs/toolkit";

import cartItemsReducer from "../features/cartItems/cartItemsSlice";
import toggleCartReducer from "../features/toggleCart/toggleCartSlice";
import toggleModalReducer from "../features/toggleModal/toggleModalSlice";

export const store = configureStore({
  reducer: {
    toggleCart: toggleCartReducer,
    cartItems: cartItemsReducer,
    toggleModal: toggleModalReducer,
  },
});
