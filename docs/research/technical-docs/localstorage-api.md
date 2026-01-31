# LocalStorage API - Technical Documentation

## Overview

**Source**: MDN Web Docs - Web Storage API
**URL**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
**Accessed**: January 2026
**Relevance to Focus Flow**: Core technology for data persistence (FR9, FR10, NFR5, NFR6)

---

## What is LocalStorage?

LocalStorage is a web storage mechanism that allows web applications to store key-value pairs locally in a user's browser with no expiration time. Data persists even after the browser is closed and reopened.

### Key Characteristics

- **Storage Type**: Key-value pairs (strings only)
- **Capacity**: Typically 5-10 MB per domain (browser-dependent)
- **Scope**: Per origin (protocol + domain + port)
- **Persistence**: No expiration - data remains until explicitly deleted
- **Synchronous**: Blocking operations (can impact performance with large datasets)

---

## Core API Methods

### 1. `localStorage.setItem(key, value)`

Stores a key-value pair in localStorage.

```javascript
localStorage.setItem('tasks', JSON.stringify(tasksArray));
localStorage.setItem('lastSaved', new Date().toISOString());
```

**Important**: Values must be strings. Use `JSON.stringify()` for objects/arrays.

---

### 2. `localStorage.getItem(key)`

Retrieves the value associated with a key.

```javascript
const tasksJSON = localStorage.getItem('tasks');
const tasks = JSON.parse(tasksJSON);
```

**Returns**: String value or `null` if key doesn't exist.

---

### 3. `localStorage.removeItem(key)`

Removes a specific key-value pair.

```javascript
localStorage.removeItem('tasks');
```

---

### 4. `localStorage.clear()`

Removes all key-value pairs from localStorage.

```javascript
localStorage.clear(); // Deletes everything
```

---

### 5. `localStorage.key(index)`

Returns the key name at a specific index.

```javascript
const firstKey = localStorage.key(0);
```

---

### 6. `localStorage.length`

Returns the number of stored items.

```javascript
console.log(localStorage.length); // e.g., 3
```

---

## Practical Application for Focus Flow

### Storing Tasks Array

```javascript
const tasks = [
  {
    id: 1,
    title: 'Complete assignment',
    priority: 'high',
    estimatedTime: 120,
    completed: false
  },
  {
    id: 2,
    title: 'Review notes',
    priority: 'medium',
    estimatedTime: 30,
    completed: false
  }
];

// Save to localStorage
localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
```

### Retrieving Tasks

```javascript
const loadTasks = () => {
  const tasksJSON = localStorage.getItem('focusFlowTasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
};
```

### Error Handling (NFR5)

```javascript
const saveTasks = (tasks) => {
  try {
    localStorage.setItem('focusFlowTasks', JSON.stringify(tasks));
    return { success: true };
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      return {
        success: false,
        error: 'Storage quota exceeded. Please delete some tasks.'
      };
    }
    return {
      success: false,
      error: 'Failed to save tasks.'
    };
  }
};
```

---

## Storage Limits & Constraints

### Browser-Specific Limits

| Browser | Typical Limit |
|---------|---------------|
| Chrome | 10 MB |
| Firefox | 10 MB |
| Safari | 5 MB |
| Edge | 10 MB |

### Quota Exceeded Handling

- **Error**: `QuotaExceededError` thrown when storage limit is reached
- **Mitigation**: Implement task limit (e.g., max 500 tasks) or data cleanup
- **User Feedback**: Display error message (NFR5)

---

## Security & Privacy Considerations

### Data Accessibility

- **Accessible by**: Any JavaScript code running on the same origin
- **Not accessible by**: Other domains, server-side code (unless transmitted)
- **Visibility**: Readable via browser DevTools (F12 → Application → LocalStorage)

### Security Best Practices

1. **Do NOT store sensitive data**: Passwords, API keys, personally identifiable information
2. **Validate data on retrieval**: Always parse and validate JSON from localStorage
3. **User awareness**: Inform users that data is stored locally (not cloud-synced)

### Privacy

- Data persists across sessions until user clears browser data
- Incognito/Private mode: localStorage is cleared when session ends
- No cross-domain access (enforced by Same-Origin Policy)

---

## Browser Compatibility

**Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
**IE Support**: Internet Explorer 8+ (with limitations)
**Mobile**: Fully supported on iOS Safari, Chrome Mobile, Firefox Mobile

### Feature Detection

```javascript
if (typeof(Storage) !== "undefined") {
  // localStorage is supported
} else {
  // Fallback: use cookies or display warning
}
```

---

## Advantages for Focus Flow

1. **No Backend Required**: Simplifies development (aligns with project scope)
2. **Instant Persistence**: Data saved immediately without network latency
3. **Offline-First**: App works without internet connection (NFR4)
4. **Simple API**: Easy to implement for CRUD operations
5. **Free**: No hosting or database costs

---

## Limitations & Trade-offs

1. **No Cloud Sync**: Data not accessible across devices (acceptable for project scope)
2. **Storage Limit**: 5-10 MB cap (sufficient for ~1000-2000 tasks)
3. **Synchronous**: Can block UI with very large datasets (mitigated by task limits)
4. **String-Only**: Requires JSON serialization/deserialization
5. **No Built-in Search**: Must implement filtering/sorting in JavaScript

---

## Testing LocalStorage

### Manual Testing (Chrome DevTools)

1. Open DevTools (F12)
2. Navigate to **Application** tab
3. Expand **LocalStorage** in sidebar
4. Select your domain
5. View/edit/delete key-value pairs

### Clearing LocalStorage Programmatically

```javascript
// For testing/reset functionality
const resetApp = () => {
  if (confirm('Delete all tasks? This cannot be undone.')) {
    localStorage.clear();
    window.location.reload();
  }
};
```

---

## Integration with React (for Focus Flow)

### Custom Hook Example

```javascript
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

// Usage in component
const [tasks, setTasks] = useLocalStorage('focusFlowTasks', []);
```

---

## Relevant Focus Flow Requirements

| Requirement | How LocalStorage Supports It |
|-------------|------------------------------|
| **FR9**: Persist tasks | `setItem()` on every CRUD operation |
| **FR10**: Retrieve tasks on reload | `getItem()` on app initialization |
| **NFR4**: Fast response time | Synchronous API, instant access |
| **NFR5**: Error handling | Try-catch for `QuotaExceededError` |
| **NFR6**: Data integrity | JSON validation on retrieval |
| **NFR7**: Cross-browser | Supported in all target browsers |

---

## References

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **W3C Specification**: https://html.spec.whatwg.org/multipage/webstorage.html
- **CanIUse**: https://caniuse.com/namevalue-storage (Browser compatibility data)
- **Web Storage API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

*Documentation compiled January 2026 for Focus Flow project technical research.*
