import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import ContentNotFound from '../common/ContentNotFound';

function AlbumDetail({ onUpdate, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get albums from Redux store
  const albums = useSelector((state) => state.albums.items);
  const album = albums.find(a => a.id === parseInt(id));

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!album) {
        setLoading(false);
        return;
      }

      try {
        // If it's a local album or already has photos, use those
        if (album.isLocal || album.photos?.length > 0) {
          setPhotos(album.photos);
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        const response = await axios.get(`${API_BASE_URL}/photos?albumId=${id}`);
        const data = response.data;
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [id, album]);

  const handleDelete = async () => {
    try {
      await onDelete(album.id);
      navigate('/albums');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!album) return (
    <ContentNotFound 
      title="Album Not Found"
      message="The album you're looking for doesn't exist or has been removed."
      type="album"
      actionLink="/albums"
      actionText="Back to Albums"
    />
  );
  if (error) return (
    <div className="text-center py-8 text-red-600">Error: {error}</div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{album.title}</h1>
      <div className="flex justify-between items-center mb-8">
        <Link 
          to={`/albums/${album.id}/edit`} 
          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
        >
          Edit Album
        </Link>
        <button 
          onClick={handleDelete} 
          className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
        >
          Delete Album
        </button>
      </div>
      {photos.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          No photos in this album yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="relative group aspect-square">
              <img 
                src={photo.thumbnailUrl || photo.url} 
                alt={photo.title} 
                className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded flex items-center justify-center">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-2">
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlbumDetail;

