function AlbumsSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg relative overflow-hidden">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="flex justify-end space-x-2">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          {/* Shimmer effect */}
          <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-gray-800/20 to-transparent"></div>
        </div>
      ))}
    </>
  );
}

export default AlbumsSkeleton;

