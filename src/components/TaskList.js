import React, { useState } from 'react';
import { Task } from './Task';

/**
 * TaskList Component
 * Renders a list of tasks with sorting and filtering capabilities
 * @param {Array} tasks - Array of task objects
 * @param {Function} onToggleComplete - Callback to toggle task completion
 * @param {Function} onDelete - Callback to delete task
 * @param {Function} onUpdate - Callback to update task
 */
export const TaskList = ({ tasks, onToggleComplete, onDelete, onUpdate }) => {
  const [sortBy, setSortBy] = useState('time'); // 'time' or 'priority'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'completed', 'incomplete'
  const [filterPriority, setFilterPriority] = useState('all'); // 'all', 'P1', 'P2', 'P3'
  const [searchKeyword, setSearchKeyword] = useState(''); // search by title or description

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'incomplete' && !task.completed);

    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;

    const searchMatch = searchKeyword === '' || 
      task.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      task.description.toLowerCase().includes(searchKeyword.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'time') {
      return a.estimatedTime - b.estimatedTime;
    }
    // Priority sort: P1 > P2 > P3
    const priorityOrder = { P1: 0, P2: 1, P3: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tasks</h2>

      {/* Search Input */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search Tasks
        </label>
        <input
          type="text"
          id="search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by title or description..."
        />
      </div>

      {/* Filters and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="time">Estimated Time</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Filter by Status */}
        <div>
          <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Filter by Priority */}
        <div>
          <label htmlFor="filterPriority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="filterPriority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="P1">P1 - High</option>
            <option value="P2">P2 - Medium</option>
            <option value="P3">P3 - Low</option>
          </select>
        </div>
      </div>

      {/* Task Count */}
      <p className="text-sm text-gray-600 mb-4">
        Showing {sortedTasks.length} of {tasks.length} task(s)
      </p>

      {/* Task List or Empty State */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {tasks.length === 0
              ? ' No tasks yet. Create your first task to get started!'
              : ' No tasks match your filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
