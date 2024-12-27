import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/slices/usersSlice';

function AlbumForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: users, status: usersStatus, error: usersError } = useSelector(state => state.users);
  const albums = useSelector(state => state.albums.items);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  useEffect(() => {
    if (id) {
      const album = albums.find(a => a.id === parseInt(id));
      if (album) {
        setTitle(album.title);
        setUserId(album.userId.toString());
        setPhotos(album.photos || []);
      }
    }
  }, [id, albums]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const albumData = {
        title,
        userId: parseInt(userId),
        photos: photos.map(photo => ({
          title: photo.title || photo.name || 'Untitled',
          url: photo.url || photo.preview || '',
          thumbnailUrl: photo.thumbnailUrl || photo.preview || ''
        }))
      };
      if (id) albumData.id = parseInt(id);
      await onSubmit(albumData);
      navigate('/albums');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(prevPhotos => [
      ...prevPhotos,
      ...files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        title: file.name,
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file)
      }))
    ]);
  };

  const removePhoto = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (usersStatus === 'loading') return <div className="text-center py-8">Loading users...</div>;
  if (usersStatus === 'failed') return <div className="text-center py-8 text-red-600">Error loading users: {usersError}</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{id ? 'Edit Album' : 'Create New Album'}</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="userId" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">User</label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
          required
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="photos" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Add Photos</label>
        <input
          type="file"
          id="photos"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>
      {photos.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-black dark:text-white">Uploaded Photos</h3>
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo.preview || photo.thumbnailUrl}
                  alt={`Uploaded photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <button type="submit" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
        {id ? 'Update Album' : 'Create Album'}
      </button>
    </form>
  );
}

export default AlbumForm;

