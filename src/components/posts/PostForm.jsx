import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/slices/usersSlice';
import LoadingSpinner from '../common/LoadingSpinner';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const posts = useSelector((state) => state.posts.items);
  const users = useSelector((state) => state.users.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    if (id) {
      const post = posts.find(p => p.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setBody(post.body);
        setUserId(post.userId.toString());
      }
    }
  }, [id, posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const post = { title, body, userId: parseInt(userId) };
      if (id) post.id = parseInt(id);
      await onSubmit(post);
      navigate('/posts');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{id ? 'Edit Post' : 'Create New Post'}</h2>
      
      <div className="mb-4">
        <label htmlFor="userId" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Author</label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
          required
        >
          <option value="">Select an author</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

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
        <label htmlFor="body" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Content</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
          rows="6"
          required
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        disabled={loading}
      >
        {id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}

export default PostForm;

