import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import cartItemsSlice from "../features/cartItems/cartItemsSlice";
import toogleCartSlice from "../features/toggleCart/toggleCartSlice";
import toggleModalSlice from "../features/toggleModal/toggleModalSlice";
import categorySlice from "../features/category/categorySlice";
import searchProductSlice from "../features/searchProduct/searchProductSlice";
import userSlice from "../features/user/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [toogleCartSlice.name]: toogleCartSlice.reducer,
      [cartItemsSlice.name]: cartItemsSlice.reducer,
      [toggleModalSlice.name]: toggleModalSlice.reducer,
      [categorySlice.name]: categorySlice.reducer,
      [searchProductSlice.name]: searchProductSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
  });

export const wrapper = createWrapper(makeStore);
