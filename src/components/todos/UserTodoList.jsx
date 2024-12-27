import { ChevronDown, ChevronUp } from 'lucide-react';
import TodoList from './TodoList';

function UserTodoList({ user, todos, onToggle, isExpanded, onToggleExpand }) {
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={onToggleExpand}
      >
        <div>
          <h2 className="text-lg font-semibold text-black dark:text-white">{user.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            {completedTodos} / {todos.length} completed
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <TodoList todos={todos} onToggle={onToggle} />
        </div>
      )}
    </div>
  );
}

export default UserTodoList;

