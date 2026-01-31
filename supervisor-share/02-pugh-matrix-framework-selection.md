# Focus Flow - Pugh Matrix (Technology Selection)

**Student:** Htet Aung (23077314)  
**Date:** January 2026  
**Decision:** Frontend Framework Selection  

---

## Overview

**Purpose**: Systematic comparison of React, Vue.js, Angular, and Vanilla JavaScript using Pugh Decision Matrix  
**Baseline**: React (scored as 0, others compared relatively)  
**Decision Outcome**: React selected as primary framework

---

## Evaluation Criteria

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

---

## React vs Vue.js

| Criterion | Weight | React (Baseline) | Vue.js | Vue Score (Weighted) | Rationale |
|-----------|--------|------------------|--------|---------------------|-----------|
| Learning Curve | 3 | 0 | +1 | +3 | Vue's template syntax more familiar to HTML/CSS developers |
| Community Support | 3 | 0 | -1 | -3 | React has larger community, more Stack Overflow answers |
| Component Reusability | 2 | 0 | 0 | 0 | Both frameworks equally support component-based architecture |
| LocalStorage Integration | 2 | 0 | 0 | 0 | Both integrate easily |
| Performance | 1 | 0 | 0 | 0 | Both use virtual DOM; differences negligible |
| Industry Relevance | 2 | 0 | -2 | -4 | React has 2-3x more job postings |
| Ecosystem/Libraries | 2 | 0 | -1 | -2 | React has more third-party packages |
| Appropriate Complexity | 2 | 0 | +1 | +2 | Vue's simpler API may be more appropriate |
| **Total** | | | | **-4** | React scores higher overall |

---

## React vs Angular

| Criterion | Weight | React (Baseline) | Angular | Angular Score (Weighted) | Rationale |
|-----------|--------|------------------|---------|-------------------------|-----------|
| Learning Curve | 3 | 0 | -2 | -6 | Angular requires TypeScript, RxJS, dependency injection |
| Community Support | 3 | 0 | +1 | +3 | Angular has good Google support |
| Component Reusability | 2 | 0 | 0 | 0 | Both support component architecture equally |
| LocalStorage Integration | 2 | 0 | -1 | -2 | Angular requires service + Observable pattern |
| Performance | 1 | 0 | -1 | -1 | Larger bundle size, slower initial load |
| Industry Relevance | 2 | 0 | 0 | 0 | Both highly relevant |
| Ecosystem/Libraries | 2 | 0 | +1 | +2 | Angular includes everything |
| Appropriate Complexity | 2 | 0 | -2 | -4 | Too heavy for a simple task manager |
| **Total** | | | | **-8** | React significantly better for this project |

---

## React vs Vanilla JavaScript

| Criterion | Weight | React (Baseline) | Vanilla JS | Vanilla Score (Weighted) | Rationale |
|-----------|--------|------------------|------------|------------------------|-----------|
| Learning Curve | 3 | 0 | +2 | +6 | No new syntax to learn |
| Community Support | 3 | 0 | -2 | -6 | No framework-specific community |
| Component Reusability | 2 | 0 | -2 | -4 | Must manually implement component patterns |
| LocalStorage Integration | 2 | 0 | +1 | +2 | Direct API access |
| Performance | 1 | 0 | +1 | +1 | No virtual DOM overhead |
| Industry Relevance | 2 | 0 | -2 | -4 | Employers expect framework experience |
| Ecosystem/Libraries | 2 | 0 | -2 | -4 | No ecosystem |
| Appropriate Complexity | 2 | 0 | -1 | -2 | Too simple; doesn't demonstrate software engineering skills |
| **Total** | | | | **-11** | React much better for academic/portfolio project |

---

## Summary: All Frameworks

| Framework | Weighted Score | Rank | Recommendation |
|-----------|---------------|------|----------------|
| React | 0 (Baseline) | 1st | **Selected** |
| Vue.js | -4 | 2nd | Good alternative, but less industry value |
| Angular | -8 | 3rd | Over-engineered for this project |
| Vanilla JS | -11 | 4th | Lacks portfolio value and structure |

---

## Final Decision: React

**Selected Framework:** React 18+  
**Confidence Level:** High (clear winner across multiple criteria)

**Key Reasons:**
1. Balances complexity and capability for academic project scope
2. Maximizes industry relevance and portfolio value
3. Strong community support reduces risk of project blockers
4. Component-based architecture demonstrates software engineering principles
5. Seamless integration with LocalStorage via hooks (useState, useEffect)

**Next Steps:**
1. Complete React official tutorial (Week 13)
2. Set up Create React App (Week 13)
3. Build prototype CRUD operations (Week 14)
4. Validate decision with supervisor

---

**Document Version:** 1.0  
**Last Updated:** January 31, 2026
