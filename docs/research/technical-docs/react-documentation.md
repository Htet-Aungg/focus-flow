# React Documentation - Technical Research

## Overview

**Source**: Official React Documentation
**URL**: https://react.dev
**Accessed**: January 2026
**Relevance to Focus Flow**: Primary frontend framework for building the task management UI

---

## What is React?

React is a JavaScript library for building user interfaces, particularly single-page applications. Developed and maintained by Meta (Facebook), React uses a component-based architecture to create reusable UI elements.

### Key Concepts

- **Components**: Independent, reusable UI pieces
- **JSX**: JavaScript XML syntax for writing HTML-like code in JavaScript
- **Virtual DOM**: Efficient rendering mechanism
- **State Management**: Local component data that triggers re-renders
- **Props**: Data passed from parent to child components
- **Hooks**: Functions to add state and lifecycle features to functional components

---

## Core React Concepts for Focus Flow

### 1. Components

Components are the building blocks of React applications.

**Functional Component Example**:

```javascript
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
```

**Focus Flow Components**:

- `App` (main container)
- `TaskForm` (create/edit tasks - FR1, FR2)
- `TaskList` (display tasks - FR3)
- `TaskItem` (individual task - FR4, FR5)
- `FilterBar` (sorting/filtering - FR6, FR7)

---

### 2. JSX (JavaScript XML)

JSX allows you to write HTML-like syntax in JavaScript.

```javascript
const element = <h1>Hello, {name}!</h1>;

// Compiles to:
const element = React.createElement('h1', null, 'Hello, ', name, '!');
```

**JSX Rules**:

- Use `className` instead of `class`
- Close all tags (`<input/>`, not `<input>`)
- Use camelCase for attributes (`onClick`, not `onclick`)
- Wrap multiple elements in a parent or Fragment

---

### 3. State Management with `useState`

`useState` is a Hook that lets you add state to functional components.

```javascript
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}
```

**Focus Flow State**:

- `tasks`: Array of task objects
- `filter`: Current filter (all/completed/incomplete)
- `sortBy`: Current sort method (priority/time/date)

---

### 4. Props (Properties)

Props pass data from parent to child components.

```javascript
function TaskList({ tasks, onDelete }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
}

// Parent passes props:
<TaskList tasks={tasks} onDelete={deleteTask} />
```

**Props are read-only**: Child components cannot modify props.

---

### 5. `useEffect` Hook

`useEffect` handles side effects (data fetching, subscriptions, DOM manipulation).

```javascript
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount (FR10)
  useEffect(() => {
    const savedTasks = localStorage.getItem('focusFlowTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []); // Empty array = run once on mount

  // Save tasks to localStorage whenever they change (FR9)
  useEffect(() => {
    localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
  }, [tasks]); // Run when tasks change

  return <div>...</div>;
}
```

**Dependency Array**:

- `[]`: Run once on mount
- `[tasks]`: Run when `tasks` changes
- No array: Run on every render (usually avoided)

---

### 6. Event Handling

```javascript
function TaskForm() {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (title.trim()) {
      onSubmit({ title, completed: false });
      setTitle(''); // Clear input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
```

---

### 7. Conditional Rendering

```javascript
function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one to get started!</p>;
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.title}
          {task.priority === 'high' && (
            <span className="urgent">!</span>
          )}
        </li>
      ))}
    </ul>
  );
}
```

**Ternary Operator**:

```javascript
{tasks.length > 0 ? <TaskList tasks={tasks} /> : <p>No tasks</p>}
```

---

### 8. Lists and Keys

**Always use unique `key` prop when rendering lists**:

```javascript
{tasks.map(task => (
  <TaskItem key={task.id} task={task} />
  // id must be unique
))}
```

**Why keys matter**: React uses keys to identify which items changed, improving performance.

---

## React Project Structure for Focus Flow

```
src/
├── components/
│   ├── TaskForm.js         // FR1: Create task
│   ├── TaskList.js         // FR3: Display tasks
│   ├── TaskItem.js         // FR4: Edit, FR5: Delete
│   └── FilterBar.js        // FR6, FR7: Filter/sort
├── App.js                  // Main component
├── App.css                 // Styling
└── index.js                // Entry point
```

---

## Relevant React Features for Focus Flow Requirements

| Requirement | React Feature |
|-------------|---------------|
| **FR1**: Create task | Controlled form inputs with `useState` |
| **FR2**: Task properties | State object with fields (title, priority, time, etc.) |
| **FR3**: View tasks | `map()` to render list from state |
| **FR4**: Edit task | Update state with `setState` + form pre-fill |
| **FR5**: Delete task | `filter()` to remove from state array |
| **FR6**: Sort tasks | `sort()` on tasks array before rendering |
| **FR7**: Filter tasks | `filter()` tasks before `map()` |
| **FR8**: Mark complete | Toggle `completed` boolean in state |
| **FR9**: Save data | `useEffect` to sync state with localStorage |
| **FR10**: Load data | `useEffect` on mount to retrieve from localStorage |
| **NFR1**: Intuitive UI | Component composition + CSS |
| **NFR2**: Responsive | CSS Flexbox/Grid, media queries |
| **NFR4**: Performance | Virtual DOM, efficient re-renders |

---

## Creating a React App

### Using Create React App (Recommended)

```bash
npx create-react-app focus-flow
cd focus-flow
npm start
```

### Using Vite (Faster alternative)

```bash
npm create vite@latest focus-flow -- --template react
cd focus-flow
npm install
npm run dev
```

---

## Best Practices for Focus Flow

### 1. Component Design

- **Single Responsibility**: Each component does one thing
- **Reusability**: Design components to be reused (e.g., `Button`, `Input`)
- **Composition**: Build complex UIs from simple components

### 2. State Management

- **Lift State Up**: Store shared state in parent component
- **Minimize State**: Only store dynamic data that changes
- **Immutable Updates**: Use spread operator (`...`) or `concat()`, not `push()`

```javascript
// Correct (immutable)
setTasks([...tasks, newTask]);

// Wrong (mutates state)
tasks.push(newTask);
setTasks(tasks);
```

### 3. Performance Optimization

- **Use `key` properly**: Helps React identify changes
- **Avoid inline functions in JSX** (creates new function on every render)
- **Memoization**: Use `useMemo` or `useCallback` for expensive operations

### 4. Code Organization

- **Separate Concerns**: Keep logic separate from presentation
- **Custom Hooks**: Extract reusable logic (e.g., `useLocalStorage`)
- **Folder Structure**: Group by feature or component type

---

## Common Patterns for Task Management

### CRUD Operations

**Create**:

```javascript
const addTask = (task) => {
  setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
};
```

**Read/Display**:

```javascript
{tasks.map(task => <TaskItem key={task.id} task={task} />)}
```

**Update**:

```javascript
const updateTask = (id, updates) => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, ...updates } : task
  ));
};
```

**Delete**:

```javascript
const deleteTask = (id) => {
  setTasks(tasks.filter(task => task.id !== id));
};
```

### Filtering

```javascript
const filteredTasks = tasks.filter(task => {
  if (filter === 'completed') return task.completed;
  if (filter === 'incomplete') return !task.completed;
  return true; // 'all'
});
```

### Sorting

```javascript
const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === 'time') return a.estimatedTime - b.estimatedTime;
  if (sortBy === 'priority') return priorityValue(a.priority) - priorityValue(b.priority);
  return 0;
});
```

---

## Accessibility (NFR3)

React supports accessibility through proper HTML semantics:

```javascript
<button
  onClick={handleDelete}
  aria-label="Delete task"
>
  ×
</button>

<input
  type="checkbox"
  checked={task.completed}
  onChange={handleToggle}
  aria-label={`Mark ${task.title} as complete`}
/>
```

---

## Testing in React

### Manual Testing

- Use React DevTools browser extension
- Inspect component state and props
- Track re-renders

### Automated Testing (Optional)

- **Jest**: Unit testing framework (included with Create React App)
- **React Testing Library**: Component testing

---

## Browser DevTools

**React Developer Tools Extension**:

- View component tree
- Inspect props and state
- Track performance

**Installation**: Available for Chrome, Firefox, Edge

---

## Advantages for Focus Flow

1. **Component Reusability**: Build once, use multiple times
2. **Declarative UI**: Easier to reason about state changes
3. **Large Community**: Extensive documentation, tutorials, support
4. **Developer Tools**: Excellent debugging experience
5. **Performance**: Virtual DOM optimizes rendering
6. **Learning Value**: Industry-standard framework (portfolio benefit)

---

## Potential Challenges

1. **Learning Curve**: Understanding JSX, state, props, hooks
2. **State Management Complexity**: Managing state across components
3. **Boilerplate**: Initial setup requires configuration
4. **Debugging**: Understanding component lifecycle and re-renders

**Mitigation**: Start simple, use official tutorials, leverage supervisor support

---

## References

- **Official Documentation**: https://react.dev
- **Tutorial**: https://react.dev/learn
- **API Reference**: https://react.dev/reference/react
- **Create React App**: https://create-react-app.dev
- **React DevTools**: https://react.dev/learn/react-developer-tools
- **Hooks Documentation**: https://react.dev/reference/react/hooks

*Documentation compiled January 2026 for Focus Flow project technical research.*
