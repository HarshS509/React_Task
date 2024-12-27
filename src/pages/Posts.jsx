import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { fetchPosts, createPost, updatePost, deletePost } from '../store/slices/postsSlice';
import { fetchUsers } from '../store/slices/usersSlice';
import PostsList from '../components/posts/PostsList';
import PostDetail from '../components/posts/PostDetail';
import PostForm from '../components/posts/PostForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemoizedPostsList = React.memo(PostsList);

function Posts() {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [status, dispatch, users.length]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const postsWithUsers = useMemo(() => {
    return posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId)
    }));
  }, [posts, users]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return postsWithUsers.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, postsPerPage, postsWithUsers]);

  const handleCreatePost = useCallback(async (newPost) => {
    try {
      await dispatch(createPost(newPost)).unwrap();
      toast.success('Post created successfully!');
    } catch (err) {
      toast.error(`Error creating post: ${err.message}`);
    }
  }, [dispatch]);

  const handleUpdatePost = useCallback(async (updatedPost) => {
    try {
      await dispatch(updatePost(updatedPost)).unwrap();
      toast.success('Post updated successfully!');
    } catch (err) {
      toast.error(`Error updating post: ${err.message}`);
    }
  }, [dispatch]);

  const handleDeletePost = useCallback(async (postId) => {
    try {
      await dispatch(deletePost(postId)).unwrap();
      toast.success('Post deleted successfully!');
    } catch (err) {
      toast.error(`Error deleting post: ${err.message}`);
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ToastContainer />
      <header className="pt-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Post Management</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create, read, update, and delete posts in this JSONPlaceholder demo. Ideal for prototyping blog or social media features.
          </p>
        </div>
      </header>


      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="mb-8">
                  <Link
                    to="/posts/create"
                    className="inline-block px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                  >
                    Create New Post
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {status === 'loading' ? (
                    <div className="col-span-full">
                      <LoadingSpinner />
                    </div>
                  ) : status === 'failed' ? (
                    <div className="col-span-full text-center py-8 text-red-600" role="alert">
                      Error: {error}. Please try refreshing the page.
                    </div>
                  ) : (
                    <MemoizedPostsList
                      posts={currentPosts}
                      onDelete={handleDeletePost}
                      currentPage={currentPage}
                      postsPerPage={postsPerPage}
                      totalPosts={posts.length}
                      paginate={setCurrentPage}
                    />
                  )}
                </div>
              </>
            }
          />
          <Route path="/create" element={<PostForm onSubmit={handleCreatePost} />} />
          <Route
            path="/:id"
            element={<PostDetail onUpdate={handleUpdatePost} onDelete={handleDeletePost} />}
          />
          <Route path="/:id/edit" element={<PostForm onSubmit={handleUpdatePost} />} />
        </Routes>
      </main>
    </div>
  );
}

export default Posts;

