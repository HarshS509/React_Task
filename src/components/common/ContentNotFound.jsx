import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

function ContentNotFound({ 
  title = "Content Not Found",
  message = "We couldn't find what you're looking for.",
  type = "content",
  actionLink = "/",
  actionText = "Go Back"
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 max-w-md w-full text-center">
        <FileQuestion className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={actionLink}
            className="inline-flex items-center justify-center px-6 py-3 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            {actionText}
          </Link>
          <Link
            to={`/${type}s`}
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            View All {type.charAt(0).toUpperCase() + type.slice(1)}s
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContentNotFound;

