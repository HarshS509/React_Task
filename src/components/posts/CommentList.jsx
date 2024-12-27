import { useState, useEffect } from 'react';
import CommentSkeleton from './CommentSkeleton';
import { Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../../utils/constants';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const api = axios.create({
    baseURL: API_BASE_URL,
  });
  
  const fetchComments = async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      // Send DELETE request using axios
      await api.delete(`/comments/${commentId}`);
  
      // Update the comments state to remove the deleted comment
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError(err.message);  // Handle any errors
    }
  };

  if (loading) return <CommentSkeleton />;
  if (error) return <div className="text-center py-4 text-red-600">Error: {error}</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map(comment => (
            <li key={comment.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-black dark:text-white">{comment.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{comment.email}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition-colors duration-200"
                  aria-label="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentList;

