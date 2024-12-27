import { useState } from 'react';

function CommentForm({ postId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/comments', 
        {
          postId,
          name,
          email,
          body
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        }
      );
      console.log('Comment added:', response.data);
     
      setName('');
      setEmail('');
      setBody('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Add a Comment</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Comment</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
        Add Comment
      </button>
    </form>
  );
}

export default CommentForm;

