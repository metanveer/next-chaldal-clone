import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalShown: false,
  modalId: "",
};

export const toggleModalSlice = createSlice({
  name: "toogle-modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      const modalId = action.payload;
      state.modalShown = true;
      state.modalId = modalId;
    },
    hideModal: (state) => {
      state.modalShown = false;
      state.modalId = "";
    },
  },
});

export const { showModal, hideModal } = toggleModalSlice.actions;

export default toggleModalSlice.reducer;
