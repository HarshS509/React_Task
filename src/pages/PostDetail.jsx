import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants';


 const api = axios.create({
    baseURL: API_BASE_URL,
  });
function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get(`/posts/${id}`),
      api.get(`/posts/${id}/comments`)
    ])
      .then(([postRes, commentsRes]) => Promise.all([postRes.json(), commentsRes.json()]))
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <article className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.body}</p>
        </article>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-2">{comment.name}</h3>
                <p className="text-gray-600 mb-2">{comment.email}</p>
                <p className="text-gray-600">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

