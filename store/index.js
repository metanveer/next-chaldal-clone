import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import cartSlice from "../features/cart/cartSlice";
import toogleCartSlice from "../features/toggleCart/toggleCartSlice";
import toggleModalSlice from "../features/toggleModal/toggleModalSlice";
import categorySlice from "../features/category/categorySlice";
import searchProductSlice from "../features/searchProduct/searchProductSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [toogleCartSlice.name]: toogleCartSlice.reducer,
      [cartSlice.name]: cartSlice.reducer,
      [toggleModalSlice.name]: toggleModalSlice.reducer,
      [categorySlice.name]: categorySlice.reducer,
      [searchProductSlice.name]: searchProductSlice.reducer,
    },
  });

export const wrapper = createWrapper(makeStore);
