function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-black dark:text-white font-semibold mb-3">JSONPlaceholder App</h3>
            <p className="text-gray-600 dark:text-gray-400">A demo application using JSONPlaceholder API</p>
          </div>
          <div>
            <h3 className="text-black dark:text-white font-semibold mb-3">Quick Links</h3>
            <nav aria-label="Quick links">
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Home</a></li>
                <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">About</a></li>
                <li><a href="/users" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Users</a></li>
                <li><a href="/posts" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Posts</a></li>
              </ul>
            </nav>
          </div>
          <div>
            <h3 className="text-black dark:text-white font-semibold mb-3">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">Email: info@example.com</p>
            <p className="text-gray-600 dark:text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} JSONPlaceholder App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

