# Focus Flow - Use Case Diagrams

**Student:** Htet Aung (23077314)  
**Date:** January 2026  

---

## Use Case Diagram Overview

The use case diagram shows the interactions between the User (primary actor) and the Focus Flow system. The system provides five core use cases with two supporting background processes (auto-save and load tasks).

---

## Primary Use Cases

### UC1: Create Task
**Actor:** User  
**Description:** User creates a new task with title, description, estimated time, and priority.  
**Includes:** Auto-save tasks (UC6)

### UC2: Edit Task
**Actor:** User  
**Description:** User modifies an existing task's properties.  
**Includes:** Auto-save tasks (UC6)

### UC3: Delete Task
**Actor:** User  
**Description:** User removes a task from the list after confirmation.  
**Includes:** Auto-save tasks (UC6)

### UC4: Complete Task
**Actor:** User  
**Description:** User toggles a task's completion status.  
**Includes:** Auto-save tasks (UC6)

### UC5: Sort/Filter Tasks
**Actor:** User  
**Description:** User applies sorting (by time) or filtering (by priority/status) to the task list.

---

## Supporting Use Cases

### UC6: Auto-Save Tasks
**Type:** Background process  
**Description:** System automatically persists task changes to LocalStorage.  
**Triggered by:** UC1, UC2, UC3, UC4  
**Includes:** Load saved tasks (UC7)

### UC7: Load Saved Tasks
**Type:** Background process  
**Description:** System retrieves tasks from LocalStorage on application startup.  
**Triggered by:** UC6

---

## Diagram Structure

```
User (Actor)
  |
  |--- UC1: Create Task -----> [includes] UC6: Auto-Save Tasks
  |--- UC2: Edit Task -------> [includes] UC6: Auto-Save Tasks
  |--- UC3: Delete Task -----> [includes] UC6: Auto-Save Tasks
  |--- UC4: Complete Task ---> [includes] UC6: Auto-Save Tasks
  |--- UC5: Sort/Filter Tasks
  
  UC6: Auto-Save Tasks -----> [includes] UC7: Load Saved Tasks
```

**Visual Diagram:** See attached `use-case-diagram.mmd` (Mermaid format) or exported PNG/PDF.

---

## Use Case Details

### UC1: Create Task

**Pre-conditions:**
- Application is open
- User is on the main task list page

**Main Flow:**
1. User clicks "Add Task" button
2. System displays task creation form
3. User enters:
   - Title (required)
   - Description (optional)
   - Estimated completion time in minutes (required)
   - Priority level: P1/P2/P3 (required)
4. User clicks "Save"
5. System validates input fields
6. System adds task to the task list
7. System triggers UC6 (auto-save to LocalStorage)
8. System displays success confirmation
9. Form is cleared for next entry

**Alternate Flows:**
- **5a. Validation fails:**
  - System displays error messages for missing/invalid fields
  - User corrects errors and returns to step 4

**Post-conditions:**
- New task is added to the task list
- Task is persisted in LocalStorage
- Form is reset to default state

---

### UC2: Edit Task

**Pre-conditions:**
- At least one task exists in the task list

**Main Flow:**
1. User clicks "Edit" button on a task
2. System displays edit form pre-filled with current task data
3. User modifies one or more fields (title, description, time, priority)
4. User clicks "Save Changes"
5. System validates updated input
6. System updates the task in the task list
7. System triggers UC6 (auto-save to LocalStorage)
8. System displays success confirmation

**Alternate Flows:**
- **4a. User cancels:**
  - User clicks "Cancel"
  - System discards changes
  - Task remains unchanged
- **5a. Validation fails:**
  - System displays error messages
  - User corrects errors and returns to step 4

**Post-conditions:**
- Task is updated with new values
- Changes are persisted in LocalStorage

---

### UC3: Delete Task

**Pre-conditions:**
- At least one task exists in the task list

**Main Flow:**
1. User clicks "Delete" button on a task
2. System displays confirmation dialog: "Are you sure you want to delete this task?"
3. User confirms deletion
4. System removes the task from the task list
5. System triggers UC6 (auto-save to LocalStorage)
6. System displays success confirmation

**Alternate Flows:**
- **3a. User cancels:**
  - User clicks "Cancel" in confirmation dialog
  - System closes dialog
  - Task remains in the list

**Post-conditions:**
- Task is removed from the task list
- LocalStorage is updated to reflect deletion

---

### UC4: Complete Task

**Pre-conditions:**
- At least one task exists in the task list

**Main Flow:**
1. User clicks checkbox or "Mark Complete" button on a task
2. System toggles the task's completion status (complete ↔ incomplete)
3. System updates the task's visual appearance (e.g., strikethrough, dimmed)
4. System triggers UC6 (auto-save to LocalStorage)

**Post-conditions:**
- Task completion status is toggled
- Visual indicator shows new status
- Changes are persisted in LocalStorage

---

### UC5: Sort/Filter Tasks

**Pre-conditions:**
- At least one task exists in the task list

**Main Flow:**
1. User selects a sorting or filtering option:
   - **Sort by:** Estimated time (ascending)
   - **Filter by:** Priority level (P1/P2/P3/all)
   - **Filter by:** Completion status (all/completed/incomplete)
2. System applies the selected sorting/filtering rule
3. System re-renders the task list in real-time (no page refresh)

**Post-conditions:**
- Task list is displayed according to selected sort/filter criteria
- User can apply multiple filters simultaneously (e.g., P1 tasks + incomplete)

---

### UC6: Auto-Save Tasks

**Type:** System background process

**Trigger:**
- Task is created (UC1)
- Task is edited (UC2)
- Task is deleted (UC3)
- Task is marked complete/incomplete (UC4)

**Main Flow:**
1. System serializes the current task list to JSON format
2. System writes JSON data to browser's LocalStorage under key "focusFlowTasks"
3. System triggers UC7 (load saved tasks) to verify data integrity

**Error Handling:**
- If LocalStorage quota is exceeded (NFR5):
  - System displays user-friendly error message
  - Suggest reducing number of tasks or clearing completed tasks

---

### UC7: Load Saved Tasks

**Type:** System background process

**Trigger:**
- Application startup (page load/refresh)
- After auto-save (UC6)

**Main Flow:**
1. System checks if LocalStorage contains "focusFlowTasks" key
2. If data exists:
   - System retrieves JSON data from LocalStorage
   - System parses JSON to task objects
   - System renders tasks in the task list
3. If no data exists:
   - System displays empty state message: "No tasks yet. Create your first task!"

**Error Handling:**
- If JSON parsing fails:
  - System logs error to console
  - System displays fallback message: "Unable to load saved tasks"
  - Prevents application crash

---

## Traceability Matrix: Use Cases → Functional Requirements

| Use Case | Related Functional Requirements |
|----------|-------------------------------|
| UC1: Create Task | FR1, FR9, FR10 |
| UC2: Edit Task | FR3, FR9, FR10 |
| UC3: Delete Task | FR4, FR9, FR10 |
| UC4: Complete Task | FR5, FR9, FR10 |
| UC5: Sort/Filter Tasks | FR6, FR7, FR8 |
| UC6: Auto-Save Tasks | FR9, FR10 |
| UC7: Load Saved Tasks | FR2, FR9 |

---

**Document Version:** 1.0  
**Last Updated:** January 31, 2026  
**Note:** Visual diagram file (`use-case-diagram.mmd` or exported image) should be included with this document.
