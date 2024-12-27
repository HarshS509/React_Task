function TodosSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden relative">
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            </div>
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mr-4"></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            {[...Array(3)].map((_, todoIndex) => (
              <div key={todoIndex} className="flex items-center gap-4 p-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
          {/* Shimmer effect */}
          <div className="absolute inset-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-gray-800/20 to-transparent"></div>
        </div>
      ))}
    </>
  );
}

export default TodosSkeleton;

