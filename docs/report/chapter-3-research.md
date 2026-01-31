# Chapter 3. Research

## 3.1 Introduction

This chapter presents the research undertaken to inform the design and implementation of Focus Flow. The research comprises three main components: (1) a systematic literature review of academic sources on task management, prioritisation, and client-side storage; (2) case study analysis of existing task management tools; and (3) technology evaluation using a Pugh matrix to select the most appropriate frontend framework. This research grounded the project's requirements, architecture, and feature set in evidence-based practices and industry standards.

## 3.2 Literature Review

A comprehensive literature review was conducted to establish theoretical foundations for task management application design, prioritisation frameworks, and data persistence mechanisms. Nine academic sources were analysed, covering topics from cognitive psychology to software quality standards.

### 3.2.1 Task Difficulty and Prioritisation

**Habbert and Schroeder (2020)** investigated the impact of task ordering on self-efficacy. Their experimental research found that people predict leaving hard tasks for later improves efficacy, but **hard-to-easy ordering actually improves self-efficacy more effectively**. This "eat the frog first" principle supports the design of Focus Flow's prioritisation features (FR6–FR8), which encourage users to tackle high-priority or time-consuming tasks earlier in the day.

> "Participants who completed harder tasks first reported higher self-efficacy and sustained motivation compared to those who started with easier tasks" (Habbert and Schroeder, 2020, p. 104032).

**Lytvynov et al. (2020)** compared task prioritisation methods in agile software development, including MoSCoW (Must have, Should have, Could have, Won't have) and Kano models. Their analysis revealed that **opinion-driven methods (MoSCoW) and metric-driven methods (Kano) can be combined** for more robust prioritisation. This informed Focus Flow's three-level priority system (P1/P2/P3), which balances simplicity with flexibility.

**Callula et al. (2024)** evaluated the **Eisenhower Matrix** framework for project management, demonstrating a 20% improvement in project completion rates and 25% reduction in turnaround time. The study validated that integrated prioritisation tools improve productivity more effectively than manual prioritisation. This evidence justified embedding prioritisation directly into Focus Flow's task list UI rather than requiring external tools.

### 3.2.2 Self-Regulation and Time Management

**Oettingen et al. (2015)** explored **mental contrasting with implementation intentions (MCII)** as a time management technique. Their research showed that participants who used MCII-style prompts improved scheduling behaviour significantly compared to control groups. While Focus Flow's MVP does not implement MCII directly, this research suggests potential future enhancements, such as prompting users to set "if-then" implementation intentions when creating tasks.

### 3.2.3 Application Design and User Experience

**Sagar et al. (2025)** presented BrightHuman, a smart task management application using **natural language processing (NLP) for automatic categorisation** and analytics dashboards. The study reported a 25% improvement in task completion efficiency. While NLP is outside Focus Flow's scope, BrightHuman's use of **React.js for frontend development** and **interactive dashboards** validated technology choices and UI patterns for prioritisation views.

**Makalalag et al. (2021)** applied **design thinking methodology** to mobile-based project management UX design. Their process uncovered user needs through empathy mapping and prototyping. This informed Focus Flow's mobile-first responsive design approach (NFR8) and justifies the minimal, flat UI aesthetic that simplifies mobile interaction.

### 3.2.4 Client-Side Data Persistence and Security

**West and Pulimood (2012)** analysed privacy and security implications of **HTML5 Web Storage** (localStorage and sessionStorage). Their research highlighted that Web Storage lacks protective attributes like cookies' HttpOnly and Secure flags, increasing vulnerability to cross-site scripting (XSS) attacks. This informed Focus Flow's decision to:
1. Store only non-sensitive task data in localStorage (no authentication tokens or personal identifiers)
2. Implement NFR5 (graceful quota error handling)
3. Include security warnings in the application documentation

**Sinha (2020)** compared client-side storage mechanisms (cookies, localStorage, IndexedDB). The review emphasised that **different mechanisms suit different needs** and that **GDPR/CCPA compliance** requires clear data policies. Focus Flow's README includes a data privacy section explaining that all data is stored locally and never transmitted to servers.

### 3.2.5 Software Quality Standards

**ISO/IEC 9126 (2001)** defines a software quality model with six characteristics: functionality, reliability, usability, efficiency, maintainability, and portability. This standard provided the framework for structuring Focus Flow's non-functional requirements (NFR1–NFR12), ensuring comprehensive coverage of quality attributes beyond functional correctness.

### 3.2.6 Literature Review Summary

The literature review established three key design principles for Focus Flow:

1. **Prioritisation must be integrated**: External frameworks (Eisenhower, MoSCoW) improve productivity only when embedded into the workflow (Callula et al., 2024)
2. **Task ordering influences motivation**: "Eat the frog first" ordering improves self-efficacy (Habbert and Schroeder, 2020)
3. **LocalStorage is appropriate for non-sensitive data**: Suitable for task management if security limitations are acknowledged (West and Pulimood, 2012; Sinha, 2020)

## 3.3 Case Study Analysis

Three popular task management applications were analysed to identify industry best practices, common features, and design patterns:

### 3.3.1 Microsoft To-Do

**Platform**: Web, Windows, iOS, Android  
**Key Features**: My Day view, intelligent suggestions, shared lists, Microsoft 365 integration

**Strengths**:
- **"My Day" focus mode** encourages daily task selection and review, aligning with Habbert and Schroeder's findings on prioritisation
- Clean, minimalist UI reduces cognitive load
- Cross-platform synchronisation via Microsoft Graph API

**Weaknesses**:
- Requires Microsoft account (no offline-only option)
- Suggestions algorithm is opaque; users cannot customise prioritisation logic

**Relevance to Focus Flow**: Validated the importance of a daily focus view and simple task properties (title, due date, priority). However, Focus Flow's offline-first architecture avoids dependency on cloud accounts.

### 3.3.2 Todoist

**Platform**: Web, Windows, macOS, iOS, Android  
**Key Features**: Karma scoring, priority levels (P1–P4), natural language input, productivity trends

**Strengths**:
- **Four-level priority system** (P1–P4) provides granular urgency control
- Gamification via Karma points increases engagement
- Natural language parsing ("Buy milk tomorrow at 5pm") reduces input friction

**Weaknesses**:
- Free tier limits projects and features, pushing users toward subscription
- Complex UI with many settings may overwhelm casual users

**Relevance to Focus Flow**: Informed the three-level priority system (P1–P3) as a balance between Todoist's granularity and Microsoft To-Do's binary flagging. Simplified UI avoids feature bloat.

### 3.3.3 Trello

**Platform**: Web, Windows, macOS, iOS, Android  
**Key Features**: Kanban boards, drag-and-drop cards, checklists, labels, due dates

**Strengths**:
- **Visual Kanban workflow** (To-Do → Doing → Done) makes progress tangible
- Highly flexible; users can create custom workflows
- Strong collaboration features (comments, assignments, attachments)

**Weaknesses**:
- Kanban structure requires setup and maintenance
- Not optimised for simple daily task lists (better for project management)

**Relevance to Focus Flow**: Demonstrated the value of visual completion status (FR5: mark complete/incomplete). However, Focus Flow's linear task list is more appropriate for individual daily planning than Trello's board-based project management.

### 3.3.4 Case Study Synthesis

| Feature | Microsoft To-Do | Todoist | Trello | Focus Flow Decision |
|---------|----------------|---------|--------|---------------------|
| Priority Levels | Binary (flagged/unflagged) | P1–P4 | Labels (manual) | **P1–P3** (balanced granularity) |
| Daily Focus View | ✅ My Day | ✅ Today view | ❌ (board-based) | ✅ Default view shows all tasks |
| Completion Tracking | ✅ Checkboxes | ✅ Checkboxes | ✅ Drag to "Done" | ✅ Toggle complete/incomplete (FR5) |
| Offline Support | ❌ (cloud-dependent) | ❌ (cloud-dependent) | ❌ (cloud-dependent) | ✅ **LocalStorage (FR9)** |
| Sorting/Filtering | Limited | Advanced | Manual | ✅ **By time, status, priority (FR6–FR8)** |

**Key Insight**: All three competitors rely on cloud storage and user accounts. Focus Flow's **offline-first, localStorage-based architecture** fills a niche for users who prefer local data control and browser-based simplicity.

## 3.4 Technology Evaluation: Pugh Matrix

A **Pugh Decision Matrix** was employed to systematically compare frontend framework options: React, Vue.js, Angular, and Vanilla JavaScript. React was selected as the baseline (scored 0), and alternatives were evaluated against weighted criteria.

### 3.4.1 Evaluation Criteria

| Criterion | Weight | Rationale |
|-----------|--------|-----------|
| Learning Curve | 3 | Time-boxed project (26 weeks); steep curves risk Sprint 1 delays |
| Community Support | 3 | Larger communities provide better troubleshooting resources |
| Component Reusability | 2 | Modular architecture improves maintainability (NFR11) |
| LocalStorage Integration | 2 | Must integrate smoothly with client-side storage (FR9, FR10) |
| Performance | 1 | All modern frameworks meet NFR9 (200ms render for 100 tasks) |
| Industry Relevance | 2 | Enhances portfolio value and employability |
| Ecosystem/Libraries | 2 | Access to third-party components accelerates development |
| Appropriate Complexity | 2 | Framework must suit a solo academic project |

### 3.4.2 Pugh Matrix Results

| Framework | Weighted Score | Rank | Key Strengths | Key Weaknesses |
|-----------|---------------|------|---------------|----------------|
| **React** | 0 (Baseline) | 1st | Large community, industry standard, component reusability | Moderate learning curve |
| **Vue.js** | -4 | 2nd | Easier learning curve, simpler API | Smaller community, fewer job postings |
| **Angular** | -8 | 3rd | Full-featured, strong typing with TypeScript | Steepest learning curve, over-engineered for task manager |
| **Vanilla JS** | -11 | 4th | No learning curve, direct API access | No component model, limited portfolio value |

### 3.4.3 Decision Rationale

**React was selected** because it:
1. **Balances complexity and capability**: More structured than Vanilla JS, less complex than Angular
2. **Maximises industry relevance**: React skills are highly sought in web development roles (2–3× more job postings than Vue.js)
3. **Provides strong community support**: Extensive documentation, Stack Overflow answers, and tutorials reduce risk of project blockers
4. **Integrates seamlessly with LocalStorage**: React's `useState` and `useEffect` hooks simplify storage persistence patterns

Vue.js was a close second but offered less portfolio value. Angular was eliminated due to its steep learning curve (TypeScript, RxJS, dependency injection) being disproportionate to project scope. Vanilla JavaScript lacked the component-based architecture needed to demonstrate software engineering principles.

## 3.5 Main Argument and Alternative Approaches

### 3.5.1 Main Argument: Offline-First Client-Side Task Manager

**Thesis**: Focus Flow should be an **offline-first, browser-based task manager** using React and LocalStorage to provide privacy-focused, zero-setup task management for individual users.

**Supporting Evidence**:
- **Privacy advantage**: West and Pulimood (2012) and Sinha (2020) confirm LocalStorage is appropriate for non-sensitive data; users increasingly concerned about cloud data breaches
- **Accessibility**: No account creation, installation, or internet connection required reduces barriers to entry
- **Performance**: Client-side rendering meets NFR9 (200ms for 100 tasks) without server latency
- **Alignment with requirements**: All Must-Have requirements (FR1–FR10) are achievable with client-side architecture

### 3.5.2 Alternative Approach 1: Cloud-Synced Progressive Web App (PWA)

**Description**: Build a PWA with backend synchronisation (e.g., Firebase, Supabase) for cross-device access.

**Advantages**:
- Cross-device task synchronisation
- Backup and recovery via cloud storage
- Push notifications for due dates

**Disadvantages**:
- **Scope increase**: Requires backend development, authentication, API integration (beyond 26-week timeline)
- **Privacy concerns**: User data stored on third-party servers (conflicts with privacy-focused positioning)
- **Complexity**: Authentication, error handling, offline sync conflicts increase risk of project failure

**Rejection rationale**: Exceeds project scope and deviates from privacy-focused design principle.

### 3.5.3 Alternative Approach 2: Mobile-Native App

**Description**: Develop a native Android or iOS app using React Native or Flutter.

**Advantages**:
- Native performance and gestures
- Access to mobile-specific APIs (notifications, widgets)

**Disadvantages**:
- **Platform lock-in**: Would need to choose iOS or Android, limiting accessibility
- **Deployment complexity**: App store submission, testing on multiple devices
- **Learning curve**: React Native differs from React; would require additional study

**Rejection rationale**: Web app provides broader accessibility (works on any device with a browser) and aligns with UWE module's web development focus.

### 3.5.4 Selected Approach Justification

The **offline-first client-side approach** was selected because it:
1. Aligns with project timeline and academic scope
2. Demonstrates full-stack web development skills (even without a backend, localStorage management showcases data persistence patterns)
3. Addresses a genuine user need (privacy-focused, no-account task management)
4. Minimises technical risk while maximising portfolio value

## 3.6 Summary

This chapter presented the research foundation for Focus Flow. The literature review established evidence-based principles for task prioritisation, self-efficacy, and client-side storage. Case study analysis of Microsoft To-Do, Todoist, and Trello informed feature prioritisation and UI design patterns. Technology evaluation via Pugh matrix justified React as the optimal frontend framework. Finally, comparison of alternative architectural approaches validated the offline-first, browser-based design as the most appropriate solution for the project's scope, timeline, and objectives.

The next chapter (Chapter 4) translates these research insights into formal requirements, including functional requirements, non-functional quality attributes, and use case specifications.

---

## References

Callula, B., Sana, E., Jacqueline, G., Nathalie, J. and Maria, L., 2024. A Structural Framework for Implementing the Eisenhower Matrix as a Project Management Tool. *International Journal of Advanced Computer Science and Applications*, 15(10), pp. 651–660. Available at: https://doi.org/10.14569/IJACSA.2024.0151068 (Accessed: 31 January 2026).

Habbert, R. and Schroeder, J., 2020. To build efficacy, eat the frog first: People misunderstand how the difficulty-ordering of tasks influences efficacy. *Journal of Experimental Social Psychology*, 91, pp. 104032. Available at: https://doi.org/10.1016/j.jesp.2020.104032 (Accessed: 31 January 2026).

ISO/IEC, 2001. *ISO/IEC 9126-1:2001 Software engineering — Product quality — Part 1: Quality model*. Geneva: International Organization for Standardization. Available at: https://www.iso.org/standard/22749.html (Accessed: 31 January 2026).

Lytvynov, V., Bogdan, I., Zadorozhnyi, A. and Bilous, I., 2020. Task prioritisation methods in requirements engineering. *Ukrainian Journal of Educational Studies and Information Technology*, 8(4), pp. 27–43. Available at: https://doi.org/10.32919/uesit.2020.04.03 (Accessed: 31 January 2026).

Makalalag, A.H., Ekawardhani, Y. and Lumban Gaol, T.V., 2021. UX design of mobile-based project management application using design thinking method. *Jurnal Ilmu Komputer dan Sistem Informasi*, 9(1), pp. 34–43. Available at: https://doi.org/10.24912/jiksi.v9i1.11436 (Accessed: 31 January 2026).

Oettingen, G., Kappes, H., Guttenberg, K.B. and Gollwitzer, P.M., 2015. Self-regulation of time management: Mental contrasting with implementation intentions. *European Journal of Social Psychology*, 45(2), pp. 218–229. Available at: https://doi.org/10.1002/ejsp.2090 (Accessed: 31 January 2026).

Sagar, P.K., Singh, H., Kabaria, V. and Dixit, U., 2025. BrightHuman: Development of a Smart Task Management Application with Natural Language Processing, Chatbot Integration, and Interactive Dashboards. *International Research Journal of Modernization in Engineering Technology and Science*, 07(01), pp. 2006–2015. Available at: https://doi.org/10.56726/IRJMETS66631 (Accessed: 31 January 2026).

Sinha, A.R., 2020. Navigating client-side storage: Cookies, local storage, session storage, and IndexedDB. *Medium*. Available at: https://medium.com/@amanrsinha19/navigating-client-side-storage-cookies-local-storage-session-storage-and-indexeddb-6f16bd1c315a (Accessed: 31 January 2026).

West, W. and Pulimood, S.M., 2012. Analysis of privacy and security in HTML5 web storage. *Journal of Computer Science in Colleges*, 27, pp. 80–87. Available at: https://doi.org/10.5555/2038772.2038791 (Accessed: 31 January 2026).
