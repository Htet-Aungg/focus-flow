# Focus Flow - Requirements Document

**Student:** Htet Aung (23077314)  
**Supervisor:** Sami Abuezhayeh  
**Date:** January 2026  
**Project:** Focus Flow - Browser-based Task Management Application

---

## 1. Functional Requirements (FRs)

### 1.1 Core Task Management

**FR1**: Users shall be able to create a new task with a title, description, estimated completion time (in minutes), and priority level (P1/P2/P3).

**FR2**: Users shall be able to view a list of all tasks.

**FR3**: Users shall be able to edit an existing task's title, description, estimated time, and priority level.

**FR4**: Users shall be able to delete a task.

**FR5**: Users shall be able to mark a task as complete or incomplete.

### 1.2 Sorting and Filtering

**FR6**: Users shall be able to sort tasks by estimated completion time (ascending).

**FR7**: Users shall be able to filter tasks by completion status (all/completed/incomplete).

**FR8**: Users shall be able to filter tasks by priority level (P1/P2/P3/all).

### 1.3 Data Persistence

**FR9**: All tasks shall persist across browser sessions using LocalStorage.

**FR10**: The application shall automatically save changes when tasks are created, updated, or deleted.

---

## 2. Non-Functional Requirements (NFRs)

Based on ISO/IEC 9126 Software Engineering: Product Quality

### 2.1 Usability

**NFR1**: The user interface shall be intuitive and require no training for basic task operations.

**NFR2**: All primary actions (create, edit, delete, sort, filter) shall be accessible within 2 clicks.

### 2.2 Functionality

**NFR3**: The application shall correctly perform all CRUD operations without data loss.

**NFR4**: Sorting and filtering shall update the task list in real-time without page refresh.

### 2.3 Reliability

**NFR5**: The application shall handle LocalStorage quota errors gracefully with a user-friendly message.

**NFR6**: Data integrity shall be maintained even if the browser crashes during an operation.

### 2.4 Portability

**NFR7**: The application shall function correctly on Chrome, Firefox, Edge, and Safari (latest versions).

**NFR8**: The application shall be responsive and usable on desktop and tablet screen sizes (≥768px width).

### 2.5 Efficiency

**NFR9**: Task list rendering shall complete within 200ms for up to 100 tasks.

**NFR10**: LocalStorage read/write operations shall not cause visible UI lag.

### 2.6 Maintainability

**NFR11**: Code shall follow consistent naming conventions and include inline comments for complex logic.

**NFR12**: The project shall use a version control system (Git) with meaningful commit messages.

---

## 3. Use Cases

### UC1: Create Task
- **Primary Actor**: User
- **Preconditions**: App is open; user is on task list.
- **Main Flow**:
  1. User selects "Add Task".
  2. User enters title, description, estimated time, and priority.
  3. User saves the task.
  4. System validates input and adds the task to the list.
  5. System persists the task to LocalStorage.
- **Alternate Flows**:
  - 3a. Missing/invalid fields → system shows validation errors.

### UC2: Edit Task
- **Primary Actor**: User
- **Preconditions**: At least one task exists.
- **Main Flow**:
  1. User selects "Edit" on a task.
  2. User updates fields.
  3. User saves changes.
  4. System updates the task and persists changes.
- **Alternate Flows**:
  - 3a. User cancels → no changes saved.

### UC3: Complete Task
- **Primary Actor**: User
- **Preconditions**: At least one task exists.
- **Main Flow**:
  1. User toggles a task to complete.
  2. System updates status and persists changes.

### UC4: Prioritise/Filter Tasks
- **Primary Actor**: User
- **Preconditions**: At least one task exists.
- **Main Flow**:
  1. User selects sort by estimated time or filters by priority/status.
  2. System updates the task list in real time.

### UC5: Delete Task
- **Primary Actor**: User
- **Preconditions**: At least one task exists.
- **Main Flow**:
  1. User selects "Delete" on a task.
  2. System asks for confirmation.
  3. User confirms deletion.
  4. System removes the task and persists changes.

---

## 4. Requirements Prioritisation (MoSCoW)

| Priority | Requirements |
|----------|--------------|
| **Must Have** | FR1–FR5, FR9, FR10, NFR3, NFR11, NFR12 |
| **Should Have** | FR6–FR8, NFR1, NFR2, NFR4, NFR7 |
| **Could Have** | NFR5, NFR6, NFR8, NFR9, NFR10 |

---

## 5. Acceptance Criteria (Example for FR1)

**FR1**: Users shall be able to create a new task.

**Given** the user is on the main task list page  
**When** the user clicks "Add Task" and enters:
- Title: "Complete ethics checklist"
- Description: "Fill out and submit to supervisor"
- Estimated time: 30 minutes
- Priority: P1  

**Then** the task appears in the task list with all entered details  
**And** the task is saved to LocalStorage  
**And** the form is cleared for the next entry.

---

**Document Version:** 1.0  
**Last Updated:** January 31, 2026
