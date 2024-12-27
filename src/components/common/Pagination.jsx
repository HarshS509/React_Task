import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
      </button>
      
      {getPageNumbers().map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' ? onPageChange(number) : null}
          disabled={number === '...'}
          className={`px-3 py-1 rounded-md transition-colors duration-200 ${
            currentPage === number
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : number === '...'
              ? 'text-gray-600 dark:text-gray-400 cursor-default'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
          aria-label={typeof number === 'number' ? `Page ${number}` : 'More pages'}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
      </button>
    </nav>
  );
}

export default Pagination;

