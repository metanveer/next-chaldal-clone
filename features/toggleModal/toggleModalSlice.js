import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalShown: false,
};

export const toggleModalSlice = createSlice({
  name: "toogle-modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalShown = true;
    },
    hideModal: (state) => {
      state.modalShown = false;
    },
  },
});

export const { showModal, hideModal } = toggleModalSlice.actions;

export default toggleModalSlice.reducer;
