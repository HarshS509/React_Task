import { Link } from 'react-router-dom';
import { Edit2, Trash2, User } from 'lucide-react';

function AlbumCard({ album, onDelete }) {
  return (
    <article className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow duration-200 group w-full h-full relative">
      <h2 className="text-xl font-bold mb-2 text-black dark:text-white line-clamp-1">
        <Link to={`/albums/${album.id}`} className="hover:underline">
          {album.title}
        </Link>
      </h2>
      <div className="mb-4 flex items-center text-gray-600 dark:text-gray-400">
        <User className="w-5 h-5 mr-2" aria-hidden="true" />
        <span>{album.user ? album.user.name : 'Unknown User'}</span>
      </div>
     
      <div className="flex justify-end items-center gap-4 mt-auto absolute bottom-4 right-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <Link 
          to={`/albums/${album.id}/edit`} 
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={`Edit album: ${album.title}`}
        >
          <Edit2 className="w-5 h-5" aria-hidden="true" />
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            onDelete(album.id);
          }}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={`Delete album: ${album.title}`}
        >
          <Trash2 className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default AlbumCard;

