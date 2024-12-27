import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import ContentNotFound from '../common/ContentNotFound';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

function PostDetail({ onUpdate, onDelete }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get posts and users from Redux store
  const posts = useSelector((state) => state.posts.items);
  const users = useSelector((state) => state.users.items);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // First check if the post exists in our Redux store
        const localPost = posts.find(p => p.id === parseInt(id));
        if (localPost) {
          const user = users.find(u => u.id === localPost.userId);
          setPost({ ...localPost, user });
          setLoading(false);
          return;
        }

        // If not in store, try to fetch from API
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
        const data = response.data;
        const user = users.find(u => u.id === data.userId);
        setPost({ ...data, user });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, posts, users]);

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
      navigate('/posts');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error || !post) return (
    <ContentNotFound 
      title="Post Not Found"
      message="The post you're looking for doesn't exist or has been removed."
      type="post"
      actionLink="/posts"
      actionText="Back to Posts"
    />
  );

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span className="text-gray-600 dark:text-gray-400">
          {post.user ? post.user.name : 'Unknown User'}
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{post.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{post.body}</p>
      <div className="flex justify-between items-center mb-8">
        <Link 
          to={`/posts/${post.id}/edit`} 
          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
        >
          Edit Post
        </Link>
        <button 
          onClick={handleDelete} 
          className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default PostDetail;

