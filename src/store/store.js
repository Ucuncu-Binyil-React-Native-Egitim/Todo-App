import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './features/todoSlice';
import topItemsSlice from './features/topItems';

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    topItems: topItemsSlice.reducer,
  },
});

export default store;
