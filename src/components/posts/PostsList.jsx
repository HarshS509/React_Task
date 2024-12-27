import PostCard from './PostCard';
import Pagination from '../common/Pagination';

function PostsList({ posts, onDelete, currentPage, postsPerPage, totalPosts, paginate }) {
  return (
    <>
      {posts.map(post => (
        <PostCard key={post.id} post={post} onDelete={onDelete} />
      ))}
      <div className="col-span-full">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalPosts / postsPerPage)}
          onPageChange={paginate}
        />
      </div>
    </>
  );
}

export default PostsList;

