import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

// Helper to generate a unique ID
const generateUniqueId = (posts) => {
  const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0);
  return maxId + 1;
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  const posts = response.data;
  return posts;
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost, { getState }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, newPost);
      if (response.status !== 201) throw new Error('Failed to create post');
      
      // Generate a new unique ID locally
      const state = getState();
      const uniqueId = generateUniqueId(state.posts.items);
      
      // Return the new post with the generated ID
      return {
        ...newPost,
        id: uniqueId,
      };
    } catch (error) {
      // Even if the server request fails, we'll create the post locally
      const state = getState();
      const uniqueId = generateUniqueId(state.posts.items);
      return {
        ...newPost,
        id: uniqueId,
      };
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (updatedPost, { getState }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${updatedPost.id}`, updatedPost);
      if (response.status !== 200) throw new Error('Failed to update post');
      
      // Return the updated post regardless of server response
      return updatedPost;
    } catch (error) {
      // Even if the server request fails, we'll update the post locally
      return updatedPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { getState }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      if (response.status !== 200) throw new Error('Failed to delete post');
      
      return postId;
    } catch (error) {
      // Even if the server request fails, we'll delete the post locally
      return postId;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    localPosts: [], // Track posts created locally
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Combine fetched posts with local posts
        const allPosts = [...action.payload, ...state.localPosts];
        // Remove duplicates based on ID
        state.items = Array.from(new Map(allPosts.map(post => [post.id, post])).values());
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.localPosts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          // Update in localPosts if it exists there
          const localIndex = state.localPosts.findIndex(post => post.id === action.payload.id);
          if (localIndex !== -1) {
            state.localPosts[localIndex] = action.payload;
          }
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
        state.localPosts = state.localPosts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

