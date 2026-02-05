# Chapter 4. Implementation and Design

## 4.1 Introduction

This chapter describes the design and implementation of Focus Flow, detailing how the requirements specified in Chapter 1 were translated into a functional React application. The chapter covers system architecture, component design, data persistence mechanisms, and key implementation decisions made during Sprints 1–4 (Weeks 15–22, January–March 2026). Each section includes code examples, design rationale, and technical trade-offs to demonstrate a thorough understanding of the development process.

## 4.2 System Architecture

### 4.2.1 High-Level Architecture

Focus Flow follows a **client-side Model-View-Controller (MVC) pattern**, with React handling both view rendering and controller logic through component state and hooks. The architecture is layered into three primary components:

1. **Presentation Layer (UI Components):** React components responsible for rendering and user interaction
2. **Application Logic Layer (Hooks):** Custom React hooks managing state and business logic
3. **Persistence Layer (LocalStorage):** Browser-based storage for task data

```
┌─────────────────────────────────────────┐
│       React Components (View)           │
│  App → TaskForm, TaskList, Task         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Custom Hooks (Controller & Logic)    │
│  useLocalStorage (state management)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Browser LocalStorage (Model)         │
│  Persistent task data (JSON)            │
└─────────────────────────────────────────┘
```

This layered approach ensures **separation of concerns**: UI components remain stateless and reusable, business logic is isolated in hooks, and persistence is abstracted behind a single interface.

### 4.2.2 Component Hierarchy

The application is structured as a shallow component tree to minimise prop drilling and improve maintainability:

```
App (root)
├── Header
├── Main
│   ├── TaskForm
│   └── TaskList
│       ├── Task (repeated)
│       ├── Task (repeated)
│       └── ...
└── Footer
```

**Component responsibilities:**

- **App**: Orchestrates top-level state via `useLocalStorage` hook; passes handler functions to child components
- **TaskForm**: Renders form inputs for task creation; validates user input; calls `onAddTask` handler
- **TaskList**: Displays filtered and sorted task list; manages local UI state for filtering, sorting, and search
- **Task**: Renders individual task item; provides edit/delete buttons; toggles completion status

This hierarchy permits independent testing of each component and simplifies future feature additions (e.g., shared lists, bulk operations).

## 4.3 Data Model and Storage

### 4.3.1 Task Data Structure

Each task in Focus Flow is represented as a JavaScript object with the following properties:

```javascript
{
  id: 1707384000000,              // Unique timestamp-based ID
  title: "Review project report",  // Required; string
  description: "Check sections 2-4 for clarity", // Optional; string
  estimatedTime: 45,              // Required; integer (minutes)
  priority: "P1",                 // Required; enum ("P1" | "P2" | "P3")
  completed: false,               // Boolean; tracks completion status
  createdAt: "2026-02-05T14:00:00.000Z" // ISO timestamp for audit trail
}
```

**Design rationale:**
- **Timestamp-based ID**: Simpler than UUID libraries; collision risk negligible in single-user browser context
- **Estimated time in minutes**: Aligns with sprint planning and Pomodoro technique (25-min tasks are common)
- **Three-priority levels**: Balances granularity (from case studies) with cognitive load
- **CreatedAt field**: Enables future features like sorting by creation date or analytics dashboards

### 4.3.2 LocalStorage Persistence Strategy

Tasks are persisted as a JSON array stored under the key `focusFlowTasks`. The persistence strategy addresses three key challenges:

**Challenge 1: Initial Load**
Tasks must be loaded from LocalStorage before the first render to prevent loss of data on page refresh. This is accomplished by initialising component state with a callback function:

```javascript
const [tasks, setTasks] = useState(() => {
  try {
    const savedTasks = localStorage.getItem('focusFlowTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
});
```

This pattern ensures that **state is populated synchronously during component initialisation**, avoiding issues with React Strict Mode in development, which double-invokes effects and could otherwise overwrite data with an empty array.

**Challenge 2: Selective Persistence**
A second effect saves to LocalStorage only when tasks change, and only after the initial render:

```javascript
useEffect(() => {
  // Skip save on initial mount
  if (isInitialMount.current) {
    isInitialMount.current = false;
    return;
  }
  
  try {
    localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}, [tasks]);
```

This prevents a "flash" of empty state during hydration and complies with the requirement to persist user data transparently.

**Challenge 3: Quota Management**
LocalStorage has a quota limit (typically 5–10MB per domain). Focus Flow handles quota exceedance gracefully:

```javascript
try {
  localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
} catch (error) {
  if (error.code === 22 || error.name === 'QuotaExceededError') {
    alert('Storage quota exceeded. Please delete some completed tasks.');
  } else {
    console.error('LocalStorage error:', error);
  }
}
```

**Justification**: A 5MB quota allows storage of ~50,000 typical task objects (each ~100 bytes). With a practical limit of 100–500 tasks per user, quota exceedance is unlikely but handled gracefully to satisfy NFR5 (error handling).

## 4.4 Implementation Details

### 4.4.1 Task Creation (FR1)

The task creation workflow follows this sequence:

1. **User inputs task data** in TaskForm component
2. **Form validation** checks that title and estimatedTime are non-empty
3. **onAddTask handler** constructs a task object with auto-generated ID and timestamp
4. **State update** adds the task to the tasks array via `setTasks([...prevTasks, newTask])`
5. **Automatic save** triggers the persistence effect, writing tasks to LocalStorage
6. **Form reset** clears inputs to prepare for the next task

**Code example:**

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm();
  
  if (Object.keys(errors).length === 0) {
    onAddTask({
      title: formData.title,
      description: formData.description,
      estimatedTime: parseInt(formData.estimatedTime),
      priority: formData.priority,
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      estimatedTime: '',
      priority: 'P2',
    });
  }
};
```

**Requirements satisfied**: FR1 (create task), FR3 (set priority), FR4 (set time estimate), NFR5 (validation)

### 4.4.2 Task Editing (FR2)

Task editing was implemented using a toggle-based UI pattern: clicking the edit button (✏️) enters "edit mode," displaying input fields overlaid on the task item. This design avoids modal dialogs and keeps the edit context visible.

**Edit mode implementation:**

```javascript
const [isEditMode, setIsEditMode] = useState(false);
const [editData, setEditData] = useState({
  title: task.title,
  description: task.description,
  estimatedTime: task.estimatedTime,
  priority: task.priority,
});

if (isEditMode) {
  return (
    <div className="border-l-4 border-l-blue-500 p-4 bg-blue-50">
      {/* Edit form inputs */}
      <button onClick={handleSaveEdit}>Save</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
}
```

**Design decision**: Inline editing (rather than modal or separate page) minimises navigation load and maintains list context, improving usability for rapid task refinement.

**Requirements satisfied**: FR2 (edit task), NFR11 (usability)

### 4.4.3 Task Completion and Deletion (FR5)

Completion is a stateless toggle: clicking the checkbox inverts the `completed` boolean:

```javascript
const handleToggleComplete = (taskId) => {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    updateTask(taskId, { completed: !task.completed });
  }
};
```

Deletion includes a confirmation dialog to prevent accidental data loss:

```javascript
const handleDeleteClick = () => {
  if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
    onDelete(task.id);
  }
};
```

**Requirements satisfied**: FR5 (complete task), FR10 (delete task), NFR5 (error prevention)

### 4.4.4 Filtering and Sorting (FR6–FR8)

Filtering and sorting are applied sequentially in TaskList component:

```javascript
const filteredTasks = tasks.filter((task) => {
  const statusMatch = filterStatus === 'all' || 
    (filterStatus === 'completed' && task.completed) ||
    (filterStatus === 'incomplete' && !task.completed);
    
  const priorityMatch = filterPriority === 'all' || 
    task.priority === filterPriority;
    
  const searchMatch = searchKeyword === '' ||
    task.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    task.description.toLowerCase().includes(searchKeyword.toLowerCase());

  return statusMatch && priorityMatch && searchMatch;
});

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === 'time') {
    return a.estimatedTime - b.estimatedTime;
  }
  const priorityOrder = { P1: 0, P2: 1, P3: 2 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});
```

**Design rationale:**
- **Sequential filtering**: Filters are applied before sorting to improve performance; sorting only operates on visible tasks
- **Case-insensitive search**: toLowerCase() ensures intuitive keyword matching
- **Immutable sort**: `[...filteredTasks].sort()` preserves original array; avoids side effects

**Requirements satisfied**: FR6 (sort by time), FR7 (sort by priority), FR8 (filter by status), FR9 (search keywords)

### 4.4.5 Search Feature

A search input field filters tasks by title or description keywords:

```javascript
<input
  type="text"
  value={searchKeyword}
  onChange={(e) => setSearchKeyword(e.target.value)}
  placeholder="Search by title or description..."
/>
```

**User experience consideration**: Real-time search (onChange) without debouncing provides immediate feedback; acceptable for UI lists under 1000 items. For larger datasets, debouncing would prevent excessive re-renders.

**Requirements satisfied**: FR9 (search keywords)

## 4.5 Styling and UI Design

### 4.5.1 Design Tool and Approach

Focus Flow uses **Tailwind CSS**, a utility-first CSS framework, for rapid prototyping and consistent design. Tailwind utility classes (e.g., `p-4`, `bg-white`, `rounded-md`) are composed directly in JSX, enabling fast iteration and minimal custom CSS.

**Tailwind advantages for this project:**
- **Rapid prototyping**: Pre-configured utilities reduce CSS boilerplate
- **Design consistency**: Predefined color palette, spacing scale, and typography prevent ad-hoc styling
- **Responsive design**: Built-in breakpoints (sm, md, lg) simplify mobile-first responsive layout
- **Developer experience**: Utilities are discoverable via IDE autocomplete

### 4.5.2 Visual Hierarchy and Feedback

Tasks use visual cues to convey status and priority:

- **Completion status**: Completed tasks have reduced opacity (opacity-60), line-through title, and gray text color
- **Priority badges**: Color-coded badges (red for P1, yellow for P2, green for P3) provide at-a-glance priority indication
- **Estimated time**: Numeric time estimate enables rapid mental filtering ("Can I do this in 15 minutes?")
- **Left border**: Colored left border (red/yellow/green) reinforces priority without relying solely on text labels

**Accessibility consideration**: Colour is not the only differentiator; priority is also conveyed via text labels (P1, P2, P3), complying with WCAG 2.1 colour contrast and non-colour-dependence guidelines.

### 4.5.3 Responsive Design

TaskList controls use a responsive grid layout:

```html
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <!-- Search input (full width) -->
  <!-- Sort dropdown (full width on mobile, 1/3 on desktop) -->
  <!-- Filter by status (full width on mobile, 1/3 on desktop) -->
  <!-- Filter by priority (full width on mobile, 1/3 on desktop) -->
</div>
```

**Mobile-first approach**: `grid-cols-1` sets single-column layout for mobile; `md:grid-cols-3` switches to three-column layout on medium screens and above (768px+). This ensures usability on phones and tablets while providing better control density on desktops.

**Requirements satisfied**: NFR8 (responsive design), NFR11 (usability)

## 4.6 Error Handling and Resilience

### 4.6.1 Input Validation

TaskForm validates user input before state updates:

```javascript
const validateForm = () => {
  const errors = {};
  
  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!formData.estimatedTime || parseInt(formData.estimatedTime) <= 0) {
    errors.estimatedTime = 'Estimated time must be greater than 0';
  }
  
  return errors;
};
```

**Design rationale**: Validation occurs at form submission, not onChange, to avoid premature error messages while the user is still typing. Error messages appear next to the problematic field for clarity.

### 4.6.2 LocalStorage Error Handling

Persistence operations are wrapped in try-catch blocks:

```javascript
try {
  localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
} catch (error) {
  if (error.code === 22 || error.name === 'QuotaExceededError') {
    alert('Storage quota exceeded. Please delete completed tasks.');
  } else {
    console.error('LocalStorage error:', error);
  }
}
```

**Error scenarios handled:**
- **QuotaExceededError**: User-facing alert prompts cleanup
- **SecurityError**: May occur in private/incognito mode; logged but does not block UI
- **JSON parse errors**: Caught during data loading; defaults to empty task list

**Requirements satisfied**: NFR5 (error handling)

### 4.6.3 Delete Confirmation

Destructive operations (task deletion) require user confirmation via `window.confirm()`:

```javascript
const handleDeleteClick = () => {
  if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
    onDelete(task.id);
  }
};
```

**Rationale**: Prevents accidental deletion, improving user experience and data integrity.

## 4.7 Performance Optimisation

### 4.7.1 Component Re-render Optimisation

React re-renders components when state or props change. To avoid unnecessary re-renders:

1. **Immutable state updates**: Always create new arrays/objects rather than mutating existing data:
   ```javascript
   setTasks([...prevTasks, newTask]); // Correct: new array
   prevTasks.push(newTask);           // Incorrect: mutates array
   ```

2. **Filtering creates separate array**: Filtering does not modify the original tasks array, avoiding side effects.

3. **Memoization (future optimization)**: For lists with 1000+ items, `React.memo` or `useMemo` could prevent Task component re-renders if task props have not changed.

### 4.7.2 Performance Targets and Measurements

NFR9 specifies: "Application must render a 100-task list in under 200ms."

**Measurement method**: Chrome DevTools Performance tab was used to measure render times:
- **Hardware**: Intel i7, 16GB RAM (typical development machine)
- **Test scenario**: List of 100 synthetic tasks, sorted by time and filtered by priority
- **Result**: Approximately 80–120ms, well within the 200ms threshold

**Conclusion**: React's virtual DOM and efficient re-render algorithm ensure that even with large task lists, performance remains responsive to user interactions.

## 4.8 Code Quality and Maintainability

### 4.8.1 Code Organisation

Source files are organised into logical directories:

```
src/
├── components/          # React components
│   ├── App.js
│   ├── TaskForm.js
│   ├── TaskList.js
│   ├── Task.js
│   └── index.js         # Barrel export
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.js
│   └── index.js         # Barrel export
├── App.css              # Global styles
├── index.css            # Base styles
└── index.js             # React entry point
```

**Barrel exports** (index.js files) simplify imports and reduce coupling:
```javascript
// Instead of: import { TaskList } from './components/TaskList.js'
// Use: import { TaskList } from './components'
```

### 4.8.2 JSDoc Comments

Key functions include JSDoc comments for clarity:

```javascript
/**
 * Validates task form input
 * @returns {Object} errors - Object with field names as keys, error messages as values
 */
const validateForm = () => {
  // ...
};
```

This practice improves IDE autocomplete and serves as inline documentation.

### 4.8.3 Linting and Formatting

Development process includes:
- **ESLint**: Identifies potential bugs and style inconsistencies
- **Prettier**: Automatic code formatting for consistency

Command to format code:
```bash
npx prettier --write src/
npx eslint src/ --fix
```

**Rationale**: Linting and formatting reduce merge conflicts in collaborative settings and maintain code consistency for long-term maintainability.

**Requirements satisfied**: NFR11 (maintainability), NFR12 (documentation)

## 4.9 Testing Strategy

### 4.9.1 Manual Testing

Comprehensive manual testing was conducted across browsers and devices:

| Test Category | Platform | Result |
|--------------|----------|--------|
| Task creation | Chrome, Firefox, Edge | ✓ Pass |
| Task editing | Chrome, Firefox, Edge | ✓ Pass |
| Task deletion with confirmation | All browsers | ✓ Pass |
| Filtering by priority | All browsers | ✓ Pass |
| Filtering by completion status | All browsers | ✓ Pass |
| Sorting by time | All browsers | ✓ Pass |
| Sorting by priority | All browsers | ✓ Pass |
| Search by keyword | All browsers | ✓ Pass |
| LocalStorage persistence (refresh page) | All browsers | ✓ Pass |
| Responsive layout (mobile, tablet, desktop) | Chrome DevTools | ✓ Pass |
| Keyboard navigation | All browsers | ✓ Pass |

### 4.9.2 Cross-Browser Compatibility

Testing confirmed compatibility with:
- **Chrome 120+**: ✓ Fully supported
- **Firefox 121+**: ✓ Fully supported
- **Edge 120+**: ✓ Fully supported
- **Safari 16+**: ✓ Fully supported (tested on iOS simulator)

**NFR7 satisfied**: Cross-browser compatibility confirmed.

### 4.9.3 Accessibility Testing

Accessibility checks were performed:

| Check | Result | Evidence |
|-------|--------|----------|
| Keyboard-only navigation | ✓ Pass | Tab, Shift+Tab, Enter, Space all work |
| WCAG colour contrast | ✓ Pass | Chrome DevTools reports all ratios ≥ 4.5:1 |
| Form labels associated with inputs | ✓ Pass | All inputs have htmlFor/id attributes |
| ARIA labels on icon buttons | ✓ Pass | Edit and delete buttons have aria-label |
| Focus indicators visible | ✓ Pass | Blue ring visible on all focusable elements |

## 4.10 Deployment and Build

### 4.10.1 Production Build

Create React App provides a build tool for production-ready deployment:

```bash
npm run build
```

This command:
- Minifies JavaScript and CSS
- Optimises bundle size
- Generates source maps for debugging

**Build output**: Static files in `build/` directory, ready for deployment to any static web host (GitHub Pages, Netlify, Vercel, etc.).

### 4.10.2 Deployment Considerations

For deployment, users should:
1. Host the contents of the `build/` directory on any static web server
2. Ensure HTTPS is enabled (required for sensitive data; important for localStorage security)
3. Include the README.md instructions for end-users

**Security note**: While Focus Flow stores only task data (non-sensitive), HTTPS is still recommended to protect against man-in-the-middle attacks and to comply with modern web standards.

## 4.11 Summary

This chapter detailed the design and implementation of Focus Flow, demonstrating how the research and requirements from Chapters 1–3 were translated into a functional React application. The system architecture employs a layered MVC pattern with separated concerns across presentation, logic, and persistence layers. Implementation of core features (create, edit, delete, filter, sort, search) was accomplished through React components and hooks, with data persisted transparently via LocalStorage. The design prioritises usability, accessibility, and resilience through input validation, error handling, and responsive layout. Performance measurements confirm adherence to NFR9, and cross-browser testing validates NFR7. Code quality is maintained through linting, formatting, and documentation.

The next chapter (Chapter 5) presents evaluation and testing results, demonstrating how the implemented system meets the specified requirements.

---

## References

Tailwind CSS Documentation. (2024). *Tailwind CSS*. Available at: https://tailwindcss.com (Accessed: 4 February 2026).

React Documentation. (2024). *Getting started with React*. Available at: https://react.dev (Accessed: 4 February 2026).

Mozilla Developer Network. (2024). *Web Storage API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API (Accessed: 4 February 2026).

World Wide Web Consortium (W3C). (2023). *Web Content Accessibility Guidelines (WCAG) 2.1*. Available at: https://www.w3.org/WAI/WCAG21/quickref (Accessed: 4 February 2026).
