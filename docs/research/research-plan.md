# Focus Flow - Research Plan

## Research Overview
This project will rely entirely on **secondary research** (no primary data collection). Research will inform tool selection, methodology, and requirements definition.

---

## 1. Secondary Research Areas

### 1.1 Publications & Academic Papers

#### Task Management & Productivity
- **Topic**: Prioritization techniques (Eisenhower Matrix, MoSCoW, Eat the Frog)
- **Sources**: ACM Digital Library, IEEE Xplore, Google Scholar
- **Keywords**: "task prioritization", "time management software", "productivity tools"
- **Expected findings**: Evidence-based prioritization methods to justify FR6-FR8

#### User Interface Design for Task Management
- **Topic**: UX patterns for CRUD applications
- **Sources**: Nielsen Norman Group, UX research papers
- **Keywords**: "todo app UX", "task list design patterns", "form usability"
- **Expected findings**: Best practices for NFR1-NFR2 (usability)

#### LocalStorage & Data Persistence
- **Topic**: Browser storage mechanisms and limitations
- **Sources**: W3C standards, MDN Web Docs, technical white papers
- **Keywords**: "LocalStorage API", "browser storage limits", "data persistence web apps"
- **Expected findings**: Technical constraints and best practices for FR9-FR10

---

### 1.2 Industry White Papers & Standards

#### ISO/IEC 9126 Software Quality Model
- **Source**: ISO standards documentation
- **Purpose**: Framework for NFRs (usability, reliability, efficiency, etc.)
- **Application**: Structure NFRs using recognized quality attributes

#### Web Content Accessibility Guidelines (WCAG) 2.1
- **Source**: W3C
- **Purpose**: Ensure app is accessible (supports NFR1)
- **Application**: Color contrast, keyboard navigation, screen reader support

---

### 1.3 Technical Documentation

#### Framework Documentation
- **React Official Docs**: https://react.dev
- **LocalStorage API**: MDN Web Docs
- **Git Best Practices**: Atlassian Git tutorials

---

### 1.4 Case Studies

#### Existing Task Management Tools
Analyze 3-5 existing tools to identify gaps and opportunities:

| Tool | Strengths | Weaknesses | Relevance to Focus Flow |
|------|-----------|------------|------------------------|
| **Todoist** | Priority levels, clean UI | Lacks time-based sorting | Validate need for FR6 |
| **Microsoft To Do** | Simple CRUD, cloud sync | No estimated time field | Justify estimated time feature (FR1) |
| **Trello** | Visual boards, flexible | Overkill for simple tasks | Validate minimalist approach |
| **Google Tasks** | Minimal, integrated | Limited prioritization | Gap analysis for sorting/filtering |
| **Any.do** | Quick add, reminders | No time estimation | Support FR2 design |

**Analysis approach**:
- Feature comparison matrix
- Identify missing features (FR6-FR8 gap)
- Screenshot UI patterns for design inspiration

---

## 2. Technology & Tool Selection

### 2.1 Frontend Framework Selection

#### Criteria (using Pugh Matrix)
| Framework | Learning Curve | Community Support | LocalStorage Integration | Component Reusability | **Score** |
|-----------|----------------|-------------------|--------------------------|----------------------|----------|
| **React** | Medium (0) | Excellent (+2) | Native (+2) | Excellent (+2) | **+6** |
| Vanilla JS | Low (+1) | N/A (0) | Native (+2) | Poor (-1) | **+2** |
| Vue.js | Low (+1) | Good (+1) | Native (+2) | Good (+1) | **+5** |
| Angular | High (-2) | Good (+1) | Native (+2) | Excellent (+2) | **+3** |

**Selection**: React (highest score, industry-relevant, good for portfolio)

---

### 2.2 Supporting Technologies

| Category | Tool/Technology | Justification |
|----------|----------------|---------------|
| **Version Control** | Git + GitHub | Industry standard (NFR12), free, portfolio hosting |
| **Testing** | Jest (React) | Built-in with Create React App, good documentation |
| **Styling** | CSS Modules or Tailwind CSS | Component-scoped styles, rapid prototyping |
| **Code Quality** | ESLint + Prettier | Enforce consistency (NFR11) |
| **Storage** | LocalStorage API | Simple, no backend required, meets FR9-FR10 |

---

### 2.3 Development Tools

- **IDE**: Visual Studio Code
- **Browser DevTools**: Chrome DevTools (LocalStorage inspector)
- **Design**: Figma (wireframes) or pen & paper
- **Documentation**: Markdown (in Git repo)

---

## 3. Requirements Derivation

### 3.1 Sources for Requirements

#### From Secondary Research
- **Academic papers on productivity**: Justify prioritization features (FR6-FR8)
- **UX case studies**: Inform usability requirements (NFR1-NFR2)
- **Technical docs**: Define data persistence constraints (FR9-FR10, NFR5-NFR6)

#### From Use Cases
Create 3-5 use cases representing typical user workflows:

**Use Case 1: Create and Prioritize Task**
- **Actor**: Student with assignment deadline
- **Goal**: Add task with priority and estimated time
- **Steps**: Open app → Click "Add Task" → Enter details → Save
- **Derives**: FR1, FR2, NFR1

**Use Case 2: Focus on Quick Wins**
- **Actor**: User with 30 minutes free
- **Goal**: Find tasks completable in <30 min
- **Steps**: Filter by time → Sort ascending → Pick top task
- **Derives**: FR6, FR7, NFR4

**Use Case 3: Review Progress**
- **Actor**: User at end of day
- **Goal**: See completed vs. incomplete tasks
- **Steps**: Filter by completion status → Review list
- **Derives**: FR5, FR7

---

### 3.2 Functional Requirements (FRs)
(Already defined in requirements.md - derived from use cases above)

---

### 3.3 Non-Functional Requirements (NFRs)
(Already defined in requirements.md - derived from ISO/IEC 9126 + case study analysis)

---

## 4. Methodology

### 4.1 Development Methodology

**Agile (Scrum-inspired) with adaptations for solo work**

**Why Agile?**
- Iterative development suits uncertain requirements
- Allows testing and feedback loops
- Aligns with supervisor meeting schedule (sprints = 2 weeks)

**Adaptations**:
- No daily standups (solo project)
- Bi-weekly supervisor meetings replace sprint reviews
- Backlog managed in GitHub Issues

**Sprint Structure**:
- **Duration**: 2 weeks
- **Planning**: Set sprint goals based on requirements prioritization
- **Development**: Implement Must-Have → Should-Have → Could-Have
- **Review**: Demo to supervisor, gather feedback
- **Retrospective**: Reflect on what worked (for report Chapter 7)

---

### 4.2 Risk Identification & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **LocalStorage quota exceeded** | Medium | High | Implement NFR5 (error handling), test with large datasets early |
| **React learning curve delays progress** | High | Medium | Allocate Week 1-2 for tutorials, use official docs, start simple |
| **Scope creep** | Medium | High | Stick to Must-Have requirements, defer Could-Have to future work |
| **Browser compatibility issues** | Low | Medium | Test on Chrome/Firefox/Edge from Sprint 1 (NFR7) |
| **Data loss during development** | Low | High | Commit to Git daily (NFR12), test LocalStorage early |
| **Supervisor unavailability** | Low | Medium | Book meetings 2 weeks ahead, send email updates |
| **Report writing time underestimated** | High | High | Draft chapters incrementally during sprints (Phase 4 plan) |

---

### 4.3 Tools for Methodology

- **Project Management**: GitHub Projects (Kanban board for backlog)
- **Version Control**: Git (branching strategy in git-setup-instructions.md)
- **Testing**: Manual testing checklists + Jest unit tests
- **Documentation**: Markdown files in `docs/` folder
- **Communication**: Email + supervisor meetings

---

## Research Deliverables

1. **Literature Review** (for report Chapter 3):
   - 10-15 academic sources on task management and prioritization
   - 5+ technical documentation sources (React, LocalStorage, ISO 9126)
   - Case study analysis of 3-5 existing tools

2. **Technology Selection Report**:
   - Pugh matrix for framework selection
   - Justification table for all tools

3. **Use Case Diagrams**:
   - 3-5 use cases with actors, goals, steps
   - Link each use case to derived requirements

4. **Risk Register**:
   - Complete risk table with mitigation strategies

---

## Timeline for Research Phase

| Week | Dates | Activity |
|------|-------|----------|
| 5-6 | Nov 4-17, 2024 | Attend Lectures 5-6; Begin literature search (academic papers on prioritization); Complete ethics checklist |
| 7-8 | Nov 18-Dec 1, 2024 | Attend Lectures 7-8; Receive ethics approval; Analyze 3-5 existing tools (Todoist, Microsoft To Do, Trello, Google Tasks, Any.do) |
| 9-10 | Dec 2-15, 2024 | Attend Lectures 9-10; Complete Pugh matrix for framework selection; Research React docs, LocalStorage API, ISO 9126 |
| 11 | Dec 16-22, 2024 | Attend Lecture 11; Finalize functional and non-functional requirements; Create use case diagrams |
| 12 | Dec 23-29, 2024 | REVIEW WEEK - Consolidate research notes; Organize literature review documents; Document methodology and risks |
| Break | Dec 30, 2024 - Jan 12, 2025 | Review React tutorials; Set up development environment; Draft Chapter 2 (Method) and Chapter 3 (Research) |

---

## Next Steps

1. ✅ Share this research plan with supervisor for approval
2. Start literature search using UWE Library databases
3. Create use case diagrams
4. Complete Pugh matrix for framework selection
5. Update requirements.md with use case references
6. Begin report Chapter 2 (Method) and Chapter 3 (Research) drafts