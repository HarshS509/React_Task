import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../utils/constants';
import axios from 'axios';


 const api = axios.create({
    baseURL: API_BASE_URL,
  });
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  // Make parallel requests with axios
  const [todosResponse, usersResponse] = await Promise.all([
    api.get('/todos'),
    api.get('/users')
  ]);

  const todos = todosResponse.data;
  const users = usersResponse.data;

  // Combine todos with user information
  const todosWithUserInfo = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId)
  }));

  return todosWithUserInfo;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (todo) => {
  const response = await api.put(`/todos/${todo.id}`, {
    ...todo,
    completed: !todo.completed
  });

  return response.data;  // Return the updated todo from the response
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default todosSlice.reducer;

