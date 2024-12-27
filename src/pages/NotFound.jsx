import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
      <h1 className="text-[200px] font-bold text-black dark:text-white leading-none">
        404
      </h1>
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
        Page not found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
      >
        Back To Home
      </Link>
    </div>
  );
}

export default NotFound;

