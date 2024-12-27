import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { fetchAlbums, createAlbum, updateAlbum, deleteAlbum } from '../store/slices/albumsSlice';
import { fetchUsers } from '../store/slices/usersSlice';
import AlbumsList from '../components/albums/AlbumsList';
import AlbumDetail from '../components/albums/AlbumDetail';
import AlbumForm from '../components/albums/AlbumForm';
import AlbumsSkeleton from '../components/albums/AlbumsSkeleton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemoizedAlbumsList = React.memo(AlbumsList);

function Albums() {
  const dispatch = useDispatch();
  const { items: albums, status, error } = useSelector((state) => state.albums);
  const { status: usersStatus } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAlbums());
    }
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, usersStatus, dispatch]);

  const currentAlbums = useMemo(() => {
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    return albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  }, [currentPage, albumsPerPage, albums]);

  const handleCreateAlbum = useCallback(async (newAlbum) => {
    try {
      const createdAlbum = await dispatch(createAlbum(newAlbum)).unwrap();
      if (newAlbum.photos && newAlbum.photos.length > 0) {
        console.log(`Added ${newAlbum.photos.length} photos to album ${createdAlbum.id}`);
      }
      toast.success('Album created successfully!');
      navigate('/albums');
    } catch (err) {
      toast.error(`Error creating album: ${err.message}`);
    }
  }, [dispatch, navigate]);

  const handleUpdateAlbum = useCallback(async (updatedAlbum) => {
    try {
      await dispatch(updateAlbum(updatedAlbum)).unwrap();
      toast.success('Album updated successfully!');
      navigate('/albums');
    } catch (err) {
      toast.error(`Error updating album: ${err.message}`);
    }
  }, [dispatch, navigate]);

  const handleDeleteAlbum = useCallback(async (albumId) => {
    try {
      await dispatch(deleteAlbum(albumId)).unwrap();
      toast.success('Album deleted successfully!');
    } catch (err) {
      toast.error(`Error deleting album: ${err.message}`);
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ToastContainer />
      <header className="pt-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Album Management</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage photo albums in this JSONPlaceholder demo. Great for testing gallery or media management features in your apps.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <>
              <div className="mb-8">
                <Link to="/albums/create" className="inline-block px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                  Create New Album
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Albums list">
                {status === 'loading' ? (
                  <AlbumsSkeleton />
                ) : status === 'failed' ? (
                  <div className="col-span-full text-center py-8 text-red-600" role="alert">
                    Error: {error}. Please try refreshing the page.
                  </div>
                ) : (
                  <MemoizedAlbumsList 
                    albums={currentAlbums} 
                    onDelete={handleDeleteAlbum}
                    currentPage={currentPage}
                    albumsPerPage={albumsPerPage}
                    totalAlbums={albums.length}
                    paginate={setCurrentPage}
                  />
                )}
              </div>
            </>
          } />
          <Route path="/create" element={<AlbumForm onSubmit={handleCreateAlbum} />} />
          <Route path="/:id" element={<AlbumDetail onUpdate={handleUpdateAlbum} onDelete={handleDeleteAlbum} />} />
          <Route path="/:id/edit" element={<AlbumForm onSubmit={handleUpdateAlbum} />} />
        </Routes>
      </main>
    </div>
  );
}

export default Albums;

