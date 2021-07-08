import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartShown: false,
};

export const toggleCartSlice = createSlice({
  name: "toggleCart",
  initialState,
  reducers: {
    showCart: (state) => {
      state.cartShown = true;
    },
    hideCart: (state) => {
      state.cartShown = false;
    },
  },
});

export const { showCart, hideCart } = toggleCartSlice.actions;

export default toggleCartSlice;
