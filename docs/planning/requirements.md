# Focus Flow - Requirements Document

## Functional Requirements (FRs)

### Core Task Management
- **FR1**: Users shall be able to create a new task with a title, description, estimated completion time (in minutes), and priority level (P1/P2/P3).
- **FR2**: Users shall be able to view a list of all tasks.
- **FR3**: Users shall be able to edit an existing task's title, description, estimated time, and priority level.
- **FR4**: Users shall be able to delete a task.
- **FR5**: Users shall be able to mark a task as complete or incomplete.

### Sorting and Filtering
- **FR6**: Users shall be able to sort tasks by estimated completion time (ascending).
- **FR7**: Users shall be able to filter tasks by completion status (all/completed/incomplete).
- **FR8**: Users shall be able to filter tasks by priority level (P1/P2/P3/all).

### Data Persistence
- **FR9**: All tasks shall persist across browser sessions using LocalStorage.
- **FR10**: The application shall automatically save changes when tasks are created, updated, or deleted.

---

## Non-Functional Requirements (NFRs)
Based on ISO/IEC 9126 Software Engineering: Product Quality

### Usability
- **NFR1**: The user interface shall be intuitive and require no training for basic task operations.
- **NFR2**: All primary actions (create, edit, delete, sort, filter) shall be accessible within 2 clicks.

### Functionality
- **NFR3**: The application shall correctly perform all CRUD operations without data loss.
- **NFR4**: Sorting and filtering shall update the task list in real-time without page refresh.

### Reliability
- **NFR5**: The application shall handle LocalStorage quota errors gracefully with a user-friendly message.
- **NFR6**: Data integrity shall be maintained even if the browser crashes during an operation.

### Portability
- **NFR7**: The application shall function correctly on Chrome, Firefox, Edge, and Safari (latest versions).
- **NFR8**: The application shall be responsive and usable on desktop and tablet screen sizes (≥768px width).

### Efficiency
- **NFR9**: Task list rendering shall complete within 200ms for up to 100 tasks.
- **NFR10**: LocalStorage read/write operations shall not cause visible UI lag.

### Maintainability
- **NFR11**: Code shall follow consistent naming conventions and include inline comments for complex logic.
- **NFR12**: The project shall use a version control system (Git) with meaningful commit messages.

---

## User Stories

### Epic: Task Management
- **US1**: As a user, I want to create a task with a title and description so I can remember what needs to be done.
- **US2**: As a user, I want to assign an estimated completion time to each task so I can plan my day.
- **US3**: As a user, I want to assign a priority level (P1/P2/P3) to each task so I can identify important work.
- **US4**: As a user, I want to edit a task so I can update details as my plans change.
- **US5**: As a user, I want to delete a task so I can remove items I no longer need.
- **US6**: As a user, I want to mark tasks as complete so I can track my progress.

### Epic: Prioritisation
- **US7**: As a user, I want to sort tasks by estimated time so I can tackle quick wins first.
- **US8**: As a user, I want to filter tasks by priority level so I can focus on high-value work.
- **US9**: As a user, I want to filter tasks by completion status so I can see what's left to do.

### Epic: Persistence
- **US10**: As a user, I want my tasks to be saved automatically so I don't lose my work if I close the browser.

---

## Acceptance Criteria (Sample for FR1)

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

## Prioritisation

| Priority | Requirements |
|----------|--------------|
| **Must Have** | FR1–FR5, FR9, FR10, NFR3, NFR11, NFR12 |
| **Should Have** | FR6–FR8, NFR1, NFR2, NFR4, NFR7 |
| **Could Have** | NFR5, NFR6, NFR8, NFR9, NFR10 |