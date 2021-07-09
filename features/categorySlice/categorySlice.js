import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  client: {
    curCategory: {},
  },
  server: {
    categories: [],
    curCategory: {},
  },
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategoriesAtServer: (state, action) => {
      state.server.categories = action.payload;
    },
    setCurCategoryAtServer: (state, action) => {
      state.server.curCategory = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE", action.payload);
      state.server.categories = action.payload.categorySlice.server.categories;
      state.server.curCategory =
        action.payload.categorySlice.server.curCategory;
    },
  },
});

export const { setCategoriesAtServer, setCurCategoryAtServer } =
  categorySlice.actions;

export default categorySlice;
