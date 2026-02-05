import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing tasks in localStorage
 * @returns {Object} { tasks, addTask, updateTask, deleteTask }
 */
export const useLocalStorage = () => {
  const [tasks, setTasks] = useState([]);
  const isInitialMount = useRef(true);
  const STORAGE_KEY = 'focusFlowTasks';

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
    } finally {
      isInitialMount.current = false;
    }
  }, []);

  // Save tasks to localStorage whenever they change (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
};
