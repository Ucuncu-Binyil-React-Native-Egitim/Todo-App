import { createSlice } from '@reduxjs/toolkit';

const topItemsSlice = createSlice({
  name: 'topItems',
  initialState: {
    isEdit: false,
  },
  reducers: {
    setEditButtonOn: (state) => {
      state.isEdit = true;
    },
    setEditButtonOff: (state) => {
      state.isEdit = false;
    },
    toggleEditButton: (state) => {
      state.isEdit = !state.isEdit;
    },
  },
});

export default topItemsSlice;
export const { setEditButtonOff, setEditButtonOn, toggleEditButton } =
  topItemsSlice.actions;
