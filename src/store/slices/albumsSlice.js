import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

// Helper to generate a unique ID
const generateUniqueId = (albums) => {
  const maxId = albums.reduce((max, album) => Math.max(max, album.id), 0);
  return maxId + 1;
};

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async (_, { getState }) => {
  const { albums } = getState();
  if (albums.loaded) return albums.items;

  const [albumsResponse, usersResponse] = await Promise.all([
    axios.get(`${API_BASE_URL}/albums`),
    axios.get(`${API_BASE_URL}/users`)
  ]);

  const albumsWithUserInfo = albumsResponse.data.map(album => ({
    ...album,
    user: usersResponse.data.find(user => user.id === album.userId),
    photos: [] // Initialize empty photos array
  }));

  return albumsWithUserInfo;
});

export const createAlbum = createAsyncThunk(
  'albums/createAlbum',
  async (newAlbum, { getState }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/albums`, newAlbum);
      
      const state = getState();
      const uniqueId = generateUniqueId(state.albums.items);
      
      // Process photos if they exist
      const photos = newAlbum.photos ? newAlbum.photos.map((photo, index) => ({
        id: Date.now() + index,
        albumId: uniqueId,
        title: photo.name || `Photo ${index + 1}`,
        url: photo instanceof File ? URL.createObjectURL(photo) : photo.url || '',
        thumbnailUrl: photo instanceof File ? URL.createObjectURL(photo) : photo.thumbnailUrl || ''
      })) : [];

      return {
        ...response.data,
        id: uniqueId,
        photos,
        isLocal: true,
        user: state.users.items.find(user => user.id === parseInt(newAlbum.userId))
      };
    } catch (error) {
      console.error('Error creating album:', error);
      throw error;
    }
  }
);

export const updateAlbum = createAsyncThunk(
  'albums/updateAlbum',
  async (updatedAlbum, { getState }) => {
    const state = getState();
    const existingAlbum = state.albums.items.find(a => a.id === updatedAlbum.id);

    if (existingAlbum && existingAlbum.isLocal) {
      // For local albums, update locally without API call
      return {
        ...updatedAlbum,
        isLocal: true,
        user: state.users.items.find(user => user.id === parseInt(updatedAlbum.userId)),
        photos: [
          ...(existingAlbum.photos || []),
          ...(updatedAlbum.photos || []).filter(photo => !existingAlbum.photos.some(ep => ep.id === photo.id)).map((photo, index) => ({
            id: Date.now() + index,
            albumId: updatedAlbum.id,
            title: photo.title || photo.name || `Photo ${index + 1}`,
            url: photo.url || photo.preview || '',
            thumbnailUrl: photo.thumbnailUrl || photo.preview || ''
          }))
        ]
      };
    } else {
      // For non-local albums, attempt API call (this will fail for JSONPlaceholder)
      try {
        const response = await axios.put(`${API_BASE_URL}/albums/${updatedAlbum.id}`, updatedAlbum);
        
        return {
          ...response.data,
          user: state.users.items.find(user => user.id === parseInt(response.data.userId)),
          photos: [
            ...(existingAlbum?.photos || []),
            ...(updatedAlbum.photos || []).filter(photo => !existingAlbum.photos.some(ep => ep.id === photo.id)).map((photo, index) => ({
              id: Date.now() + index,
              albumId: updatedAlbum.id,
              title: photo.title || photo.name || `Photo ${index + 1}`,
              url: photo.url || photo.preview || '',
              thumbnailUrl: photo.thumbnailUrl || photo.preview || ''
            }))
          ]
        };
      } catch (error) {
        console.error('Error updating album:', error);
        // If API call fails, update locally
        return {
          ...updatedAlbum,
          user: state.users.items.find(user => user.id === parseInt(updatedAlbum.userId)),
          photos: [
            ...(existingAlbum?.photos || []),
            ...(updatedAlbum.photos || []).filter(photo => !existingAlbum.photos.some(ep => ep.id === photo.id)).map((photo, index) => ({
              id: Date.now() + index,
              albumId: updatedAlbum.id,
              title: photo.title || photo.name || `Photo ${index + 1}`,
              url: photo.url || photo.preview || '',
              thumbnailUrl: photo.thumbnailUrl || photo.preview || ''
            }))
          ]
        };
      }
    }
  }
);

export const deleteAlbum = createAsyncThunk(
  'albums/deleteAlbum',
  async (albumId) => {
    try {
      await axios.delete(`${API_BASE_URL}/albums/${albumId}`);
      return albumId;
    } catch (error) {
      // Even if the server request fails, we'll delete the album locally
      return albumId;
    }
  }
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    loaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Preserve local albums when fetching
        const localAlbums = state.items.filter(album => album.isLocal);
        state.items = [...action.payload, ...localAlbums];
        state.loaded = true;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.items.findIndex(album => album.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.items = state.items.filter(album => album.id !== action.payload);
      });
  },
});

export default albumsSlice.reducer;

