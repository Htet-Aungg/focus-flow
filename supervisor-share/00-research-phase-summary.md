# Focus Flow - Research Summary

**Student:** Htet Aung (23077314)  
**Supervisor:** Sami Abuezhayeh  
**Date:** January 2026  

---

## 1. Literature Review Summary

Completed a systematic review of **9 academic sources** covering task management, prioritisation, self-regulation, client-side storage, and software quality standards.

### Key Findings

**Task Difficulty & Prioritisation:**
- **Habbert & Schroeder (2020):** "Eat the frog first" principle - completing harder tasks first improves self-efficacy more than easy-to-hard ordering. Informs prioritisation features (FR6-FR8).
- **Lytvynov et al. (2020):** Comparison of MoSCoW and Kano prioritisation methods in agile. Justifies Focus Flow's P1/P2/P3 priority system.
- **Callula et al. (2024):** Eisenhower Matrix framework showed 20% improvement in project completion rates. Validates integrated prioritisation tools over manual methods.

**Self-Regulation & Time Management:**
- **Oettingen et al. (2015):** Mental contrasting with implementation intentions (MCII) improves scheduling behaviour. Potential future enhancement for Focus Flow.

**Application Design:**
- **Sagar et al. (2025):** BrightHuman app achieved 25% improvement in task completion using React.js and interactive dashboards. Validates technology choice and dashboard UX patterns.
- **Makalalag et al. (2021):** Design thinking methodology for mobile project management. Supports mobile-first responsive design approach (NFR8).

**Client-Side Storage & Security:**
- **West & Pulimood (2012):** LocalStorage lacks HttpOnly/Secure flags, increasing XSS vulnerability. Informed decision to store only non-sensitive task data.
- **Sinha (2020):** Comparison of cookies, localStorage, IndexedDB. Confirms localStorage is appropriate for non-sensitive data with clear privacy policies.

**Software Quality:**
- **ISO/IEC 9126 (2001):** Software quality model (functionality, reliability, usability, efficiency, maintainability, portability). Framework for structuring NFR1-NFR12.

### Research Outputs
- 9 literature review documents with UWE Harvard referencing
- Evidence-based design principles for task prioritisation and data persistence
- Theoretical foundation for requirements specification

---

## 2. Case Study Analysis Summary

Analysed **3 popular task management tools** to identify best practices, common features, and design patterns.

### Microsoft To-Do
- **Key Features:** "My Day" focus view, intelligent suggestions, shared lists
- **Strengths:** Clean UI, daily task selection encourages prioritisation
- **Weaknesses:** Requires Microsoft account, no offline-only option
- **Relevance:** Validated importance of daily focus view and simple task properties

### Todoist
- **Key Features:** 4-level priority system (P1-P4), Karma scoring, natural language input
- **Strengths:** Granular priority control, gamification increases engagement
- **Weaknesses:** Subscription model, complex UI may overwhelm users
- **Relevance:** Informed 3-level priority system (P1-P3) as balance between granularity and simplicity

### Trello
- **Key Features:** Kanban boards, drag-and-drop, checklists, labels
- **Strengths:** Visual Kanban workflow, highly flexible
- **Weaknesses:** Not optimised for simple daily task lists (better for project management)
- **Relevance:** Demonstrated value of visual completion status (FR5: mark complete/incomplete)

### Key Insight
All three competitors rely on cloud storage and user accounts. **Focus Flow's offline-first, localStorage-based architecture fills a niche** for users who prefer local data control and browser-based simplicity.

---

## 3. Ethics Approval Summary

**Status:** Ethics checklist completed and approved (minimal risk classification)

**Key Points:**
- No human participants involved (software build only)
- No data collection beyond developer's own testing
- LocalStorage stores only non-sensitive task data (titles, descriptions, priorities)
- Compliant with UWE Research Ethics Policy and BCS Code of Conduct
- No FREC approval required

**Risk Classification:** Minimal risk - no ethical concerns identified

---

## 4. Technology Selection (Pugh Matrix)

**Decision:** React selected as frontend framework

**Alternatives Evaluated:**
- Vue.js (scored -4)
- Angular (scored -8)
- Vanilla JavaScript (scored -11)

**Key Selection Criteria:**
1. Balances complexity and capability for academic scope
2. Maximises industry relevance (2-3x more job postings than Vue.js)
3. Strong community support reduces project risk
4. Component-based architecture demonstrates software engineering principles
5. Seamless LocalStorage integration via React hooks

**Confidence:** High - React was clear winner across weighted evaluation criteria

---

## 5. Requirements Document

**Completed Deliverables:**
- 10 Functional Requirements (FR1-FR10) organised by category:
  - Core Task Management (FR1-FR5)
  - Sorting and Filtering (FR6-FR8)
  - Data Persistence (FR9-FR10)
- 12 Non-Functional Requirements (NFR1-NFR12) based on ISO/IEC 9126:
  - Usability, Functionality, Reliability, Portability, Efficiency, Maintainability
- MoSCoW prioritisation (Must/Should/Could Have)
- 5 detailed use cases with pre-conditions, main flow, alternate flows
- Acceptance criteria examples

---

## 6. Use Case Diagrams

**Completed Deliverables:**
- Use case diagram (Mermaid format) showing 7 use cases
- Detailed specifications for each use case:
  - UC1: Create Task
  - UC2: Edit Task
  - UC3: Delete Task
  - UC4: Complete Task
  - UC5: Sort/Filter Tasks
  - UC6: Auto-Save Tasks (background process)
  - UC7: Load Saved Tasks (background process)
- Traceability matrix linking use cases to functional requirements

---

## Next Steps (Setup Phase - Weeks 13-14)

1. Set up Git repository on GitHub
2. Initialize React project with Create React App
3. Configure ESLint and Prettier
4. Review React official documentation
5. Create initial project structure
6. Schedule next supervisor meeting to review deliverables

---

**Document Version:** 1.0  
**Date:** January 31, 2026
