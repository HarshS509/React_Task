import AlbumCard from './AlbumCard';
import Pagination from '../common/Pagination';

function AlbumsList({ albums, onDelete, currentPage, albumsPerPage, totalAlbums, paginate }) {
  return (
    <>
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} onDelete={onDelete} />
      ))}
      <div className="col-span-full">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalAlbums / albumsPerPage)}
          onPageChange={paginate}
        />
      </div>
    </>
  );
}

export default AlbumsList;

