import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';
import albumsReducer from './slices/albumsSlice';
import todosReducer from './slices/todosSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    albums: albumsReducer,
    todos: todosReducer,
    theme: themeReducer,
  },
});

