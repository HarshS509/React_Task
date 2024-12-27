function UserDetailModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-300 mr-4">
              {user.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p><strong className="text-black dark:text-white">Email:</strong> <a href={`mailto:${user.email}`} className="hover:underline">{user.email}</a></p>
          <p><strong className="text-black dark:text-white">Phone:</strong> {user.phone}</p>
          <p><strong className="text-black dark:text-white">Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{user.website}</a></p>
          <div>
            <strong className="text-black dark:text-white">Company:</strong>
            <p>{user.company.name}</p>
            <p className="italic">"{user.company.catchPhrase}"</p>
            <p>{user.company.bs}</p>
          </div>
          <div>
            <strong className="text-black dark:text-white">Address:</strong>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;

