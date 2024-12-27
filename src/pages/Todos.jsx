import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, toggleTodo } from '../store/slices/todosSlice';
import UserTodoList from '../components/todos/UserTodoList';
import TodosSkeleton from '../components/todos/TodosSkeleton';

function Todos() {
  const dispatch = useDispatch();
  const { items: todos, status, error } = useSelector((state) => state.todos);
  const [expandedUsers, setExpandedUsers] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleToggle = (todo) => {
    dispatch(toggleTodo(todo));
  };

  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.userId]) {
      acc[todo.userId] = [];
    }
    acc[todo.userId].push(todo);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
    <header className="pt-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Todo Management</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Organize and track tasks in this JSONPlaceholder demo. Perfect for prototyping task management or productivity features.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {status === 'loading' ? (
            <TodosSkeleton />
          ) : status === 'failed' ? (
            <div className="text-center py-8 text-red-600">Error: {error}</div>
          ) : (
            Object.entries(groupedTodos).map(([userId, userTodos]) => (
              <UserTodoList
                key={userId}
                user={userTodos[0].user}
                todos={userTodos}
                onToggle={handleToggle}
                isExpanded={expandedUsers.includes(Number(userId))}
                onToggleExpand={() => toggleUserExpansion(Number(userId))}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Todos;

