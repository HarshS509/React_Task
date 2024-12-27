import { Link } from 'react-router-dom';
import { Edit2, Trash2, User } from 'lucide-react';

function PostCard({ post, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow duration-200 group w-full h-full relative">
      <div className="flex items-center gap-2 mb-3">
        <User className="w-4 h-4 text-gray-600 dark:text-gray-400" aria-hidden="true" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {post.user ? post.user.name : 'Unknown User'}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-2 text-black dark:text-white line-clamp-2">
        <Link to={`/posts/${post.id}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.body}</p>
      <div className="flex justify-end items-center gap-4 mt-auto absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link 
          to={`/posts/${post.id}/edit`} 
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={`Edit post: ${post.title}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Edit2 className="w-5 h-5" aria-hidden="true" />
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(post.id);
          }}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={`Delete post: ${post.title}`}
        >
          <Trash2 className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default PostCard;

