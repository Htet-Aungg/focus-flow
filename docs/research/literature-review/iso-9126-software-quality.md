## Source Information
- **Title**: ISO/IEC 9126-1:2001 Software engineering — Product quality — Part 1: Quality model  
- **Author(s)**: ISO/IEC Joint Technical Committee 1 (JTC 1)  
- **Year**: 2001  
- **Source**: International standard (ISO/IEC 9126 family)  
- **Reference (UWE Harvard)**:  
  ISO/IEC, 2001. *ISO/IEC 9126-1:2001 Software engineering — Product quality — Part 1: Quality model*. International Organization for Standardization, Geneva.  

---

## Summary
ISO/IEC 9126-1 defines a **software product quality model** that decomposes quality into six top‑level characteristics—functionality, reliability, usability, efficiency, maintainability, and portability—each further refined into sub‑characteristics with associated measurable attributes  (Bevan, 1998; Jung, Kim and Chung, 2004). The standard is intended as a general-purpose reference for specifying, evaluating, and comparing software quality, to be tailored via a quality requirements study for each project context  (Bevan, 1998). It underpins later standards (ISO/IEC 25000 SQuaRE, ISO/IEC 25010) and is widely used as a foundation for metrics, defect classification, and quality evaluation frameworks  (Bevan, 1998; Jung, Kim and Chung, 2004; Vetrò et al., 2012; Yılmaz and Tarhan, 2022).  

---

## Key Points Relevant to an NFR Framework

- **Point 1 – Six characteristics as NFR categories**  
  ISO/IEC 9126 defines six broad categories: **functionality, reliability, usability, efficiency, maintainability, portability**, each with sub‑characteristics (e.g., suitability, accuracy, fault tolerance, learnability, time behaviour) mapped to measurable attributes  (Bevan, 1998; Jung, Kim and Chung, 2004).  
  - **Application**: Use these six as the main NFR headings and derive concrete NFRs from their sub‑characteristics (e.g., “time behaviour” → response‑time targets; “fault tolerance” → graceful degradation requirements).

- **Point 2 – Link between quality model and measurement**  
  The 9126 family not only names characteristics but associates them with **metrics and evaluation procedures**, enabling more objective assessment of non‑functional requirements  (Jung, Kim and Chung, 2004; Sholiq et al., 2021; Sholiq et al., 2018).  
  - **Application**: For each NFR, attach at least one 9126‑aligned metric (e.g., defect density for reliability, task completion rate for usability) so that NFRs are verifiable rather than purely descriptive.

- **Point 3 – Tailoring and completeness checks**  
  ISO/IEC 9126 is positioned as a **checklist**: projects should select and prioritize relevant characteristics/sub‑characteristics through a quality requirements study and can use the model to classify defects and evaluate coverage of NFRs  (Bevan, 1998; Jung, Kim and Chung, 2004; Vetrò et al., 2012; Yılmaz and Tarhan, 2022).  
  - **Application**: In NFR workshops, walk through all 9126 characteristics to identify gaps (e.g., portability often overlooked), and use the taxonomy to tag user stories, defects, and tests with their impacted quality attributes.

---

### ISO/IEC 9126 Characteristics as NFR Buckets

| Level          | Description (9126-1)                                  | Example NFR Formulation                         | Citations |
|----------------|--------------------------------------------------------|--------------------------------------------------|-----------|
| Functionality  | Functions, suitability, accuracy, security             | “Support role‑based access with audit trail.”    |  (Bevan, 1998; Jung, Kim and Chung, 2004)|
| Reliability    | Maturity, fault tolerance, recoverability              | “99.9% uptime; MTTR < 1 hour.”                   |  (Bevan, 1998; Vetrò et al., 2012; Sholiq et al., 2018)|
| Usability      | Understandability, learnability, operability           | “New users complete core task within 5 minutes.” |  (Bevan, 1998; Jung, Kim and Chung, 2004)|
| Efficiency     | Time behaviour, resource utilization                   | “p95 response time < 2s under peak load.”        |  (Bevan, 1998; Sholiq et al., 2021; Kartiko, 2019)|
| Maintainability| Analyzability, changeability, stability, testability   | “High‑severity defects fixed within 2 days.”     |  (Bevan, 1998; Jung, Kim and Chung, 2004; Vetrò et al., 2012)|
| Portability    | Adaptability, installability, coexistence, replaceability | “Operate on three major OS/browser platforms.” |  (Bevan, 1998; Jung, Kim and Chung, 2004)|

**Figure 1:** Using ISO 9126 characteristics to structure concrete NFRs.

---

## Quotes to Use in Report
> ISO/IEC 9126 “defines six broad categories of software quality: functionality, reliability, usability, efficiency, maintainability and portability,” each broken into sub‑characteristics with measurable attributes  (Bevan, 1998).  

> “The ISO/IEC 9126 characteristics and subcharacteristics provide a useful checklist of issues related to quality. The actual characteristics … relevant in any particular situation … should be identified by a quality requirements study.”  (Bevan, 1998)---

## Critique/Limitations
- ISO/IEC 9126 is **superseded** by ISO/IEC 25010 within the SQuaRE series, which expands and reorganizes quality characteristics (e.g., explicit security and compatibility)  (Gobov and Zuieva, 2025; Birla, 2014).  
- Empirical work notes some ambiguity and overlap among 9126 attributes, requiring tailoring and clear definitions for consistent use  (Jung, Kim and Chung, 2004; Vetrò et al., 2012).  
- For modern systems, 9126 is best used as a **conceptual scaffold**; detailed NFRs and metrics should, where possible, be cross‑checked against the newer ISO/IEC 25010/2502x measurement standards  (Gobov and Zuieva, 2025; Valdés-Souto, Nunez-Varela and Pérez-González, 2019; Birla, 2014).
 
_These search results were found and analyzed using Consensus, an AI-powered search engine for research. Try it at https://consensus.app. © 2026 Consensus NLP, Inc. Personal, non-commercial use only; redistribution requires copyright holders’ consent._
 
## References
 
ISO/IEC, 2001. *ISO/IEC 9126-1:2001 Software engineering — Product quality — Part 1: Quality model*. International Organization for Standardization, Geneva.
 
Bevan, N., 1998. Quality and usability: A new framework. *Journal of Systems and Software*, 39(3), pp. 189–192.
 
Jung, H., Kim, S. and Chung, C., 2004. Measuring software product quality: a survey of ISO/IEC 9126. *IEEE Software*, 21(5), pp. 88–92. Available at: https://doi.org/10.1109/ms.2004.1331309 (Accessed: 31 January 2026).
 
Gobov, D. and Zuieva, O., 2025. Software Quality Attributes in Requirements Engineering. *International Journal of Information Technology and Computer Science*, 4(4). Available at: https://doi.org/10.5815/ijitcs.2025.04.04 (Accessed: 31 January 2026).
 
Yılmaz, N. and Tarhan, A., 2022. Quality evaluation models or frameworks for open source software: A systematic literature review. *Journal of Software: Evolution and Process*, 34(3). Available at: https://doi.org/10.1002/smr.2458 (Accessed: 31 January 2026).
 
