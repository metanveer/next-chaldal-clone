import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  name: "",
  value: "",
};

export const searchProductSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.name = action.payload.name;
      state.value = action.payload.value;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.search,
      };
    },
  },
});

export const { setSearchInput } = searchProductSlice.actions;

export default searchProductSlice;
