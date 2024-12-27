function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="animate-pulse">
        {/* Header Section */}
        <div className="py-20 px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg max-w-lg mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded max-w-md mx-auto"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 relative overflow-hidden"
              >
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
                </div>
                {/* Shimmer effect */}
                <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-gray-800/20 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;

