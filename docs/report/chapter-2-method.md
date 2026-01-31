# Chapter 2. Method

## 2.1 Introduction

This chapter describes the methodology, tools, and processes adopted for the Focus Flow project. The project follows an iterative development approach aligned with agile principles, emphasising incremental delivery, regular stakeholder feedback, and continuous improvement. This chapter also addresses risk management, version control strategy, and ethical considerations.

## 2.2 Development Methodology

### 2.2.1 Agile Development Approach

The project adopts a **sprint-based agile methodology** structured around four two-week sprints (Weeks 15–22, January–March 2026). Each sprint delivers a working increment of the application, enabling early validation of requirements and continuous refinement based on testing and supervisor feedback.

**Sprint structure:**
- **Sprint 1 (Weeks 15–16):** Core CRUD operations and LocalStorage persistence
- **Sprint 2 (Weeks 17–18):** Task editing and completion functionality
- **Sprint 3 (Weeks 19–20):** Sorting and filtering capabilities
- **Sprint 4 (Weeks 21–22):** UI polish, error handling, and cross-browser testing

Each sprint concludes with a demonstration to the project supervisor, allowing for iterative feedback and course correction. This approach mitigates the risk of late-stage requirement changes and ensures that the final deliverable aligns with user needs and academic expectations.

### 2.2.2 Rationale for Agile

Agile methodology was selected for several reasons:
1. **Incremental delivery** allows early identification of technical challenges (e.g., LocalStorage limitations)
2. **Regular supervisor meetings** (bi-weekly) align with sprint cycles, providing structured feedback points
3. **Flexibility** to adjust priorities based on testing results without derailing the overall timeline
4. **Risk mitigation** through early and continuous integration, reducing the likelihood of integration failures

This methodology contrasts with traditional waterfall approaches, which would defer all integration and testing until the final phase, increasing project risk.

## 2.3 Tools and Technologies

### 2.3.1 Development Stack

The following technologies were selected based on project requirements, learning objectives, and suitability for a client-side task management application:

**Frontend Framework: React (v18+)**
- **Justification:** Component-based architecture promotes reusability and maintainability (NFR11, NFR12). React's declarative paradigm simplifies state management for task lists, filters, and sorting operations.
- **Learning curve:** Allocated Weeks 13–14 for React tutorials and environment setup to mitigate risk of delays in Sprint 1.

**Data Persistence: LocalStorage API**
- **Justification:** Meets requirements for offline-first, client-side storage (FR9, FR10) without server infrastructure. Suitable for storing non-sensitive task data (title, description, priority, completion status).
- **Limitations:** Quota constraints (~5–10MB depending on browser) addressed via NFR5 (graceful error handling).

**Build Tool: Create React App**
- Provides pre-configured Webpack, Babel, and development server for rapid prototyping.

**Code Quality Tools:**
- **ESLint:** Enforces consistent coding standards and identifies potential bugs
- **Prettier:** Automatic code formatting to improve readability and maintainability (NFR11)

**Version Control: Git + GitHub**
- Repository structure: `src/`, `docs/`, `tests/`, `public/`
- Branching strategy: Feature branches merged to `main` after testing
- Meaningful commit messages following convention: `feat:`, `fix:`, `docs:`, `test:`

### 2.3.2 Testing Tools

- **Manual testing:** Cross-browser compatibility testing (Chrome, Firefox, Edge) to satisfy NFR7
- **Performance testing:** Chrome DevTools to validate NFR9 (200ms render for 100 tasks)
- **Accessibility testing:** Keyboard navigation and WCAG contrast checks

## 2.4 Risk Management

Risks were identified at the project planning stage and monitored throughout development. Key risks and mitigation strategies include:

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|---------------------|
| **React learning curve delays Sprint 1** | High | Medium | Allocate Weeks 13–14 for React tutorials and documentation review; use official React docs and UWE library resources |
| **LocalStorage quota exceeded** | Medium | High | Implement early quota detection in Sprint 1; add user-facing error message (NFR5); test with 200+ tasks |
| **Scope creep** | Medium | High | Adhere to MoSCoW prioritisation; defer "Could-Have" features (NFR6, NFR10) to Phase 5 only if time permits |
| **Supervisor unavailability** | Low | Medium | Schedule meetings 2 weeks in advance; maintain email updates between meetings |
| **Report writing underestimated** | High | High | Draft Chapters 2–3 during research phase (Weeks 11–12); draft Chapters 4–6 incrementally during development (Weeks 15–26) |
| **Other coursework conflicts** | High | Medium | Front-load research in Term 1 (October–December 2025); concentrate development in Term 2 when other modules are lighter |

Risk reviews were conducted at each sprint retrospective and supervisor meeting to assess whether mitigation strategies remained effective.

## 2.5 Ethics Methodology

An **Ethical Review Checklist** was completed and approved by the project supervisor in November 2025. The project was classified as **minimal risk** because:

1. **No human participants:** Focus Flow is a software build with no data collection from users beyond the developer's own testing
2. **No sensitive data:** Task data (titles, descriptions, priorities) are stored locally in the browser and contain no personal identifiable information
3. **No environmental or animal concerns:** The project is purely software-based

The ethics checklist confirmed that no full Faculty Research Ethics Committee (FREC) approval was required. All development and testing activities adhered to UWE's Research Ethics Policy and the BCS Code of Conduct.

**Data protection considerations:**
- LocalStorage data remains client-side; no server transmission or third-party analytics
- User guidance provided in the application's README regarding data privacy and browser storage mechanisms
- Compliance with GDPR principles (data minimisation, purpose limitation) even though the app does not process personal data

## 2.6 Version Control and Documentation Strategy

### 2.6.1 Git Workflow

A structured version control strategy was adopted to ensure code integrity and traceability:

**Repository structure:**
```
focus-flow/
├── src/              # React components, hooks, utilities
├── public/           # Static assets (index.html, favicon)
├── docs/             # Project documentation (planning, research)
│   ├── planning/     # Requirements, timeline, diagrams
│   └── research/     # Literature review, case studies
├── tests/            # Unit tests (if implemented)
└── README.md         # Installation and usage instructions
```

**Commit conventions:**
- `feat:` for new features (e.g., `feat: add task prioritisation filter`)
- `fix:` for bug fixes (e.g., `fix: resolve LocalStorage quota error handling`)
- `docs:` for documentation updates
- `test:` for test additions or modifications

**Branching strategy:**
- `main` branch contains stable, tested code
- Feature branches (e.g., `feature/sorting`, `feature/edit-task`) merged via pull requests after local testing
- No direct commits to `main` without verification

### 2.6.2 Documentation Strategy

Documentation was maintained throughout the project lifecycle:

- **Planning documents** (requirements.md, project-timeline.md, ethic-checklist.md) created during Weeks 5–12
- **Research notes** (literature review, case studies) organised using consistent templates
- **Code comments** for complex logic (e.g., LocalStorage quota detection, sorting algorithms)
- **README.md** provides setup instructions, feature list, and known limitations

This approach ensures that the project is reproducible and comprehensible to external reviewers, satisfying academic and professional standards for software documentation (NFR11, NFR12).

## 2.7 Summary

The methodology chapter has outlined the agile sprint-based approach, technology stack, risk management strategies, ethics compliance, and version control practices that guided the Focus Flow project. By adopting iterative development with regular supervisor feedback, proactive risk mitigation, and disciplined documentation, the project minimised technical and process-related risks while delivering a functional, well-documented task management application. The next chapter (Chapter 3) presents the research that informed these methodological choices and the application's design.
