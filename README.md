# Focus Flow

> A web-based task management application that helps students prioritize work using estimated completion time and priority levels.

**Author**: Htet Aung (23077314)  
**Institution**: UWE Bristol  
**Module**: UFCFFF-30-3 Software Development Project  
**Supervisor**: Sami Abuezhayeh  
**Academic Year**: 2025-26

---

## Project Status

**Current Phase**: Core Development (Jan 27 - Mar 23, 2026)  
**Status Date**: Feb 5, 2026

- [x] Project proposal submitted
- [x] Ethics checklist submitted
- [x] Ethics approval received
- [x] Requirements finalized
- [x] Technology selection complete
- [x] Development environment configured
- [x] Project structure documented
- [x] Development started

---

## Project Overview

Focus Flow addresses the gap in task management tools that lack effective time-based prioritization. The application enables users to:

- Create tasks with estimated completion time and priority levels
- Sort tasks by time to identify "quick wins"
- Filter by priority (P1/P2/P3) and completion status
- Persist data locally without requiring account creation

---

## Tech Stack

- **Frontend**: React 18+
- **Styling**: Tailwind CSS
- **Storage**: LocalStorage API
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Version Control**: Git + GitHub

---

## Planned Features

### Must-Have (Minimum Viable Product - Sprint 1-4)
- ✅ Create, read, update, delete tasks (CRUD)
- ✅ Assign priority levels (P1/P2/P3)
- ✅ Estimate completion time for each task
- ✅ Sort by estimated time
- ✅ Filter by priority and completion status
- ✅ LocalStorage persistence

### Should-Have
- Responsive design (desktop + tablet)
- Cross-browser compatibility
- Accessibility features

### Could-Have
- Dark mode
- Task categories/tags
- Export to CSV

---

## Project Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Project Initiation | Oct 7 - Nov 3, 2025 | Complete |
| Research & Ethics | Nov 4, 2025 - Jan 12, 2026 | Complete |
| Setup & Planning | Jan 13 - Jan 26, 2026 | Complete |
| Core Development | Jan 27 - Mar 23, 2026 | In Progress |
| Testing & Refinement | Mar 24 - Apr 20, 2026 | Upcoming |
| Report Writing | Apr 21 - Apr 30, 2026 | Upcoming |
| Final Submission | Apr 30, 2026 | Upcoming |

See [docs/planning/project-timeline.md](docs/planning/project-timeline.md) for detailed schedule.

---

## Development Setup

### Prerequisites
- Node.js LTS (v18+)
- npm (v9+)
- Git
- Visual Studio Code

### Quick Start

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run tests
npm test

# Build for production
npm run build

# Lint code
npx eslint src/

# Format code
npx prettier --write src/
```

### Project Structure

```
src/
├── components/          # React components
│   ├── TaskForm.js     # Form to add new tasks
│   ├── TaskList.js     # List with filtering and sorting
│   ├── Task.js         # Individual task item
│   └── index.js        # Component exports
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js  # LocalStorage management
│   └── index.js        # Hook exports
├── App.js    # Main application component
├── App.css   # Global styles
└── index.js  # App entry point

public/       # Static assets (HTML, favicon, etc.)
docs/         # Documentation and planning
```

---

## Documentation

- [Project Proposal](docs/planning/project-proposal.md)
- [Requirements](docs/planning/requirements.md)
- [Research Plan](docs/research/research-plan.md)
- [Project Timeline](docs/planning/project-timeline.md)
- [Ethics Checklist](docs/planning/ethics-checklist.md)

---

## Git Workflow

All features are developed incrementally with meaningful commits:

```bash
# Example commit messages
git commit -m "feat: add task deletion with confirmation"
git commit -m "fix: localStorage persistence on app refresh"
git commit -m "test: add unit tests for TaskList component"
```

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Contact

**Student**: Htet Aung  
**Email**: htet4.aung@Live.uwe.ac.uk  
**Supervisor**: Sami Abuezhayeh  
**GitHub**: https://github.com/Htet-Aungg/focus-flow
