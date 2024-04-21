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
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.text = action.payload;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, editTodo } =
  todoSlice.actions;
export default todoSlice;
