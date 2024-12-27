import { Mail, MapPin, Briefcase } from 'lucide-react';

function UserCard({ user, onClick }) {
  return (
    <div 
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300 mr-4">
          {user.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-bold text-black dark:text-white">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-400 flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          {user.email}
        </p>
        <p className="text-gray-600 dark:text-gray-400 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {user.address.city}
        </p>
        <p className="text-gray-600 dark:text-gray-400 flex items-center">
          <Briefcase className="w-4 h-4 mr-2" />
          {user.company.name}
        </p>
      </div>
    </div>
  );
}

export default UserCard;

