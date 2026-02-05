import React, { useState } from 'react';

/**
 * Task Component
 * Renders an individual task item with CRUD actions
 * @param {Object} task - Task object
 * @param {Function} onToggleComplete - Callback to toggle completion
 * @param {Function} onDelete - Callback to delete task
 * @param {Function} onUpdate - Callback to update task
 */
export const Task = ({ task, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    estimatedTime: task.estimatedTime,
    priority: task.priority,
  });
  const [errors, setErrors] = useState({});

  const priorityColors = {
    P1: 'bg-red-100 text-red-800 border-red-300',
    P2: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    P3: 'bg-green-100 text-green-800 border-green-300',
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === 'estimatedTime' ? parseInt(value) || '' : value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEdit = () => {
    const newErrors = {};
    if (!editData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!editData.estimatedTime || parseInt(editData.estimatedTime) <= 0) {
      newErrors.estimatedTime = 'Estimated time must be greater than 0';
    }
    return newErrors;
  };

  const handleSaveEdit = () => {
    const newErrors = validateEdit();
    if (Object.keys(newErrors).length === 0) {
      onUpdate(task.id, {
        title: editData.title,
        description: editData.description,
        estimatedTime: editData.estimatedTime,
        priority: editData.priority,
      });
      setIsEditMode(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: task.title,
      description: task.description,
      estimatedTime: task.estimatedTime,
      priority: task.priority,
    });
    setErrors({});
    setIsEditMode(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  if (isEditMode) {
    return (
      <div className="border-l-4 border-l-blue-500 p-4 mb-3 bg-blue-50 rounded-md shadow-md">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Edit Task</h3>

        {/* Title Field */}
        <div className="mb-3">
          <label htmlFor={`title-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id={`title-${task.id}`}
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            className={`w-full px-3 py-2 border rounded-md text-gray-900 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter task title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description Field */}
        <div className="mb-3">
          <label htmlFor={`desc-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id={`desc-${task.id}`}
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
            rows="2"
          />
        </div>

        {/* Estimated Time and Priority */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor={`time-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Time (minutes) *
            </label>
            <input
              type="number"
              id={`time-${task.id}`}
              name="estimatedTime"
              value={editData.estimatedTime}
              onChange={handleEditChange}
              className={`w-full px-3 py-2 border rounded-md text-gray-900 ${
                errors.estimatedTime ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              min="1"
            />
            {errors.estimatedTime && (
              <p className="text-red-500 text-sm mt-1">{errors.estimatedTime}</p>
            )}
          </div>

          <div>
            <label htmlFor={`priority-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Priority *
            </label>
            <select
              id={`priority-${task.id}`}
              name="priority"
              value={editData.priority}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="P1">P1 - High</option>
              <option value="P2">P2 - Medium</option>
              <option value="P3">P3 - Low</option>
            </select>
          </div>
        </div>

        {/* Save/Cancel Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            className="flex-1 bg-green-600 text-white font-semibold py-2 px-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className="flex-1 bg-gray-400 text-white font-semibold py-2 px-3 rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

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

        {/* Action Buttons */}
        <div className="ml-2 flex gap-1">
          <button
            onClick={() => setIsEditMode(true)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors"
            aria-label={`Edit ${task.title}`}
            title="Edit task"
          >
            edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
            aria-label={`Delete ${task.title}`}
            title="Delete task"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};
