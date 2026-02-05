import React from 'react';
import { TaskForm, TaskList } from './components';
import { useLocalStorage } from './hooks';
import './App.css';

/**
 * Focus Flow - Task Management Application
 * Helps users prioritize work using estimated completion time and priority levels
 */
function App() {
  const { tasks, addTask, updateTask, deleteTask } = useLocalStorage();

  const handleAddTask = (taskData) => {
    addTask(taskData);
  };

  const handleToggleComplete = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed });
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-blue-600">
            🎯 Focus Flow
          </h1>
          <p className="text-gray-600 mt-1">
            Prioritize work, identify quick wins, stay focused
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-600">
          <p>
            Focus Flow v0.1.0 - UWE Bristol Software Development Project
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

