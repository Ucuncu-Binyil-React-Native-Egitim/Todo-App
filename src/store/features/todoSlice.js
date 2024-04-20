import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const currentDate = new Date();
      const newTodo = {
        id: uuid.v4(),
        text: action.payload,
        completed: false,
        createdAt: currentDate.toLocaleString('tr-TR'),
      };
      state.push(newTodo);
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice;
