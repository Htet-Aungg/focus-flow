# Project Proposal

## Problem Statement
Many standard to-do list applications lack features that help users prioritise tasks effectively beyond simple due dates. Students and professionals often need a tool that encourages them to categorise and manage tasks based on intrinsic value (such as estimated time or importance) rather than chronological order. This can support better focus and reduce task-switching. The core problem is the absence of a simple, dedicated application that implements effective prioritisation methodologies within a digital task list.

## What’s the Big Idea?
The project aims to develop **Focus Flow**, a web-based task manager that provides core CRUD functionality and introduces priority-based sorting and filtering. Each task will include a title, description, and estimated completion time. Users will be able to filter tasks by completion status and sort them either by estimated time (to encourage quick-win behaviour) or by a manually assigned priority label (P1, P2, P3). The project will focus on data persistence, application state management, and foundational UI design.

## Planned Research
1. **CRUD implementation patterns**: Best practices for Create, Read, Update, and Delete operations in the chosen technology stack.  
2. **Data persistence mechanisms**: Options such as browser LocalStorage or file-based storage (JSON/CSV) to ensure tasks persist across sessions.  
3. **Prioritisation methodologies**: Simple time-management techniques (e.g., “Eat the Frog,” “Two-Minute Rule”) to inform sorting and filtering features.  
4. **Application state management**: Efficient ways to manage state to ensure the UI updates correctly when tasks change.  

## Planned Deliverables
1. A functional web application for managing tasks  
2. Full CRUD functionality  
3. Data persistence across sessions  
4. Sorting by estimated time and filtering by completion status and priority level  
5. Technical documentation covering the data model, persistence strategy, and sorting logic  
6. A Git repository with well-commented source code  

## Research Resources
- Framework documentation (React, Vue, Node.js, Python Tkinter)  
- MDN Web Docs for LocalStorage or database/file storage libraries  
- Software design pattern resources (e.g., MVC)  
- Git/version control tutorials