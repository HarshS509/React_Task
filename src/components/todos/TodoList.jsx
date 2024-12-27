import { Check } from 'lucide-react';

function TodoList({ todos, onToggle }) {
  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="flex items-center gap-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <button
            onClick={() => onToggle(todo)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
              todo.completed
                ? 'bg-green-600 border-green-600'
                : 'border-gray-400 hover:border-gray-600 dark:border-gray-600 dark:hover:border-gray-400'
            }`}
          >
            {todo.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          <span className={`flex-1 text-sm text-black dark:text-white ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
            {todo.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TodoList;

