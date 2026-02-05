import React from 'react';

/**
 * Task Component
 * Renders an individual task item with CRUD actions
 * @param {Object} task - Task object
 * @param {Function} onToggleComplete - Callback to toggle completion
 * @param {Function} onDelete - Callback to delete task
 */
export const Task = ({ task, onToggleComplete, onDelete }) => {
  const priorityColors = {
    P1: 'bg-red-100 text-red-800 border-red-300',
    P2: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    P3: 'bg-green-100 text-green-800 border-green-300',
  };

  return (
    <div
      className={`border-l-4 p-4 mb-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow ${
        task.completed ? 'opacity-60 bg-gray-50' : ''
      } ${
        task.priority === 'P1' ? 'border-l-red-500' : task.priority === 'P2' ? 'border-l-yellow-500' : 'border-l-green-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />

          {/* Task Content */}
          <div className="flex-1">
            <h3
              className={`font-semibold text-lg ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded">
                ⏱ {task.estimatedTime} min
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 border rounded ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="ml-2 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
