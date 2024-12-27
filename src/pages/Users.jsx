import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/slices/usersSlice';
import UserCard from '../components/UserCard';
import UserDetailModal from '../components/UserDetailModal';
import SearchFilter from '../components/SearchFilter';
import UsersSkeleton from '../components/users/UsersSkeleton';

const MemoizedUserCard = React.memo(UserCard);

function Users() {
  const dispatch = useDispatch();
  const { items: users, status, error } = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCompany === '' || user.company.name === filterCompany)
    );
  }, [searchTerm, filterCompany, users]);

  const handleUserClick = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((company) => {
    setFilterCompany(company);
  }, []);

  const companies = useMemo(() => [...new Set(users.map(user => user.company.name))], [users]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="pt-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">User Management</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore and manage user data in this JSONPlaceholder demo. Perfect for testing user-related features in your applications.
          </p>
        </div>
      </header>

      <section className="py-12 px-4" aria-label="User list">
        <div className="max-w-6xl mx-auto">
          <SearchFilter 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange}
            companies={companies}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" role="list">
            {status === 'loading' ? (
              <UsersSkeleton />
            ) : status === 'failed' ? (
              <div className="col-span-full text-center py-8 text-red-600" role="alert">
                Error: {error}. Please try refreshing the page.
              </div>
            ) : (
              filteredUsers.map(user => (
                <MemoizedUserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
              ))
            )}
          </div>
        </div>
      </section>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Users;

