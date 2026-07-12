# EcoSphere — ESG Management Platform

**Odoo Hackathon — Detailed Project & Technical Specification Document**
**Technology Stack:** Django · React · SQLite
**Pillars:** Environmental · Social · Governance · Gamification

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [User Roles & Permissions](#3-user-roles--permissions)
4. [Modules & Features](#4-modules--features)
5. [Database Design Overview](#5-database-design-overview)
6. [Business Workflow](#6-business-workflow)
7. [Core Configuration & Business Rules](#7-core-configuration--business-rules)
8. [Reports](#8-reports)
9. [Bonus / Future Enhancements](#9-bonus--future-enhancements)
10. [Summary](#10-summary)

---

## 1. Project Overview

EcoSphere is an integrated ESG (Environmental, Social, and Governance) management platform designed to bring sustainability reporting directly into everyday business operations. Instead of treating ESG as a separate, manual, once-a-year reporting exercise, EcoSphere connects carbon accounting, employee CSR participation, governance compliance, and gamified engagement into a single, real-time system.

Organizations today are expected to track carbon emissions, promote employee well-being and diversity, and maintain governance and audit compliance. Most ERP systems capture the operational data needed for this (purchases, manufacturing, expenses, fleet usage) but stop short of translating it into ESG insight. EcoSphere closes that gap by layering an ESG intelligence and engagement layer on top of standard business transactions.

### 1.1 Objective

- Provide a unified dashboard where management can view Environmental, Social, and Governance performance in real time.
- Automate carbon emission calculation from routine ERP transactions (purchase, manufacturing, expenses, fleet).
- Increase employee participation in sustainability through CSR activities and gamified Challenges (XP, Badges, Rewards, Leaderboards).
- Track governance health through policies, acknowledgements, audits, and compliance issue resolution.
- Generate department-wise and organization-wide ESG scores using a configurable weighted model.
- Allow flexible, exportable reporting (PDF / Excel / CSV) with multi-dimensional filters.

### 1.2 Why This Matters

ESG scoring increasingly affects investor confidence, regulatory compliance, and brand reputation. Yet most mid-size organizations manage ESG in spreadsheets, disconnected from actual operational data. EcoSphere demonstrates how an ERP-style application, built with a modern web stack, can make ESG measurement continuous, auditable, and engaging for employees rather than a compliance burden owned only by a sustainability team.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React (React Router, Context/Redux for state, Chart.js / Recharts) | Single-page application: dashboards, forms, gamification UI, admin panels |
| Backend / API | Django + Django REST Framework (DRF) | Business logic, REST APIs, authentication, role-based permissions, scoring engine, notification triggers |
| Database | SQLite | Lightweight relational database for hackathon development; schema designed to be portable to PostgreSQL for production |
| Auth | Django's auth system + DRF Token/JWT authentication | Login, role-based access control (RBAC), session management |
| Task/Notifications | Django signals (+ optional Celery for async email in a production build) | Trigger notifications on compliance issues, approvals, badge unlocks, reminders |
| Reporting | WeasyPrint / ReportLab (PDF), openpyxl (Excel), Django CSV export | Custom Report Builder exports |

Django's ORM maps cleanly onto the Master Data / Transactional Data structure from the problem statement, and DRF's viewsets and permission classes are well suited to implementing the role-based access control this platform requires. React consumes the DRF APIs and renders role-specific dashboards, the gamification UI, and the report builder.

---

## 3. User Roles & Permissions

EcoSphere is a multi-role platform. Access is controlled through Django Groups/Permissions mapped to six primary roles. Every role logs into the same React application, but sees a role-specific dashboard and menu driven by permissions returned from the API.

### 3.1 Summary of Roles

| Role | Primary Purpose |
|---|---|
| 1. Super Admin | Full system control: users, roles, master data, org-wide configuration |
| 2. ESG / Sustainability Manager | Owns ESG configuration, monitors all three pillars, publishes reports |
| 3. Department Head / Manager | Owns department data, approves department-level CSR/Challenge participation |
| 4. Employee | Participates in CSR activities & Challenges, tracks personal XP/Badges/Rewards |
| 5. Compliance Officer / Auditor | Manages audits, compliance issues, and policy tracking |
| 6. Executive / Viewer | Read-only access to dashboards and reports for leadership review |

### 3.2 Super Admin (System Administrator)

The highest-privilege role, typically IT/platform owner. Has unrestricted access across all modules.

- Create, edit, deactivate user accounts and assign roles
- Manage master data: Departments, Categories, Emission Factors, Products
- Configure ESG scoring weights (Environmental / Social / Governance %)
- Enable/disable system-wide toggles: Auto Emission Calculation, Evidence Requirement, Badge Auto-Award
- Manage Notification Settings and system-level integrations
- Full CRUD access to every module as a fallback / override capability

### 3.3 ESG / Sustainability Manager

The functional owner of the ESG program. Sits above individual departments and is responsible for the accuracy and completeness of ESG reporting.

- Configure Emission Factors and Sustainability Goals
- Create and manage CSR Activities, Challenges, Badges and Rewards catalog
- Review and approve/reject Employee Participation and Challenge Participation submissions (org-wide)
- Create and publish ESG Policies; monitor Policy Acknowledgement completion
- View Environmental, Social, Governance and ESG Summary dashboards for all departments
- Use the Custom Report Builder and export Environmental / Social / Governance / ESG Summary Reports

### 3.4 Department Head / Manager

Owns ESG performance for a single department (or a set of child departments in the hierarchy).

- View department-specific Carbon Transactions, CSR participation and Challenge participation
- Approve or reject Employee Participation / Challenge Participation submitted by employees in their department
- Track Department Score (Environmental, Social, Governance, Total) on a dedicated dashboard
- Assign / encourage employees toward specific Challenges or CSR Activities
- View compliance issues assigned to their department and their due-date status

### 3.5 Employee

The largest user base — every staff member of the organization. Primarily interacts with the Social and Gamification modules.

- Browse and join CSR Activities and Challenges; submit proof/evidence for approval
- Track personal XP, Points, Badges earned and progress toward the next Badge
- Redeem earned Points/XP for Rewards from the catalog (subject to stock availability)
- View personal position on Leaderboards (department-wide and organization-wide)
- Acknowledge assigned ESG Policies
- Receive in-app / email notifications for approvals, reminders and badge unlocks

### 3.6 Compliance Officer / Auditor

Focused entirely on the Governance pillar — running audits and tracking remediation of issues.

- Create and manage Audits across departments
- Log Compliance Issues with Severity, Owner, Due Date and Status
- Monitor overdue Open issues (auto-flagged past Due Date) and trigger escalation notifications
- Publish and update ESG Policies; monitor acknowledgement completion rates
- Generate Governance Reports filtered by department, date range, or severity

### 3.7 Executive / Viewer (Leadership)

Read-only role for leadership (e.g. CXOs, board members) who need visibility without transactional access.

- View Organization Dashboard: Overall ESG Score and pillar-wise breakdown
- View Department ESG rankings and Leaderboards
- Export/download published reports (cannot create or edit records)
- No approval, configuration, or data-entry permissions

---

## 4. Modules & Features

EcoSphere is organized into 9 functional modules. The first four map directly to the ESG + Gamification pillars in the problem statement; the remaining five are supporting/system modules required to make the platform actually usable end-to-end.

| # | Module | Core Focus |
|---|---|---|
| 1 | Environmental | Carbon accounting, emission tracking, sustainability goals |
| 2 | Social | CSR activities, employee participation, diversity & training |
| 3 | Governance | Policies, acknowledgements, audits, compliance issues |
| 4 | Gamification | Challenges, XP, Badges, Rewards, Leaderboards |
| 5 | Dashboard & Scoring | Department/Org scoring engine and visual dashboards |
| 6 | Reports | Standard + Custom Report Builder with export |
| 7 | Notifications | In-app & email alerts across all modules |
| 8 | Settings & Administration | Departments, Categories, ESG configuration, toggles |
| 9 | Authentication & User Management | Login, roles, permissions |

### 4.1 Environmental Module

Handles all carbon-related measurement — from configuring how emissions are calculated to tracking goal progress per department.

**Key Features**
- Configure Emission Factors — reference values (e.g. kg CO2e per litre of fuel, per kWh, per unit of raw material) used in calculations
- Calculate Carbon Emissions — manually entered or auto-calculated from linked Purchase / Manufacturing / Expense / Fleet transactions when the Auto Emission Calculation toggle is enabled
- Department Carbon Tracking — running totals of emissions per department, per period
- Sustainability Goals — set department or org-level reduction targets and track progress against actuals
- Environmental Dashboard — trend charts, emissions-by-source breakdown, goal progress bars

**Core Django Models:** `Department`, `EmissionFactor`, `ProductESGProfile`, `EnvironmentalGoal`, `CarbonTransaction`

### 4.2 Social Module

Covers employee-facing sustainability engagement and social responsibility metrics.

**Key Features**
- CSR Activities — create and schedule initiatives (tree plantation, blood donation, community outreach, etc.) under a Category
- Employee Participation — employees register, upload proof, and await Approval; approved participation earns Points
- Diversity Metrics — track workforce diversity indicators (e.g. gender ratio, department distribution) for the Social score
- Training Completion — track completion of ESG-related training/awareness modules

**Core Django Models:** `Category`, `CSRActivity`, `EmployeeParticipation`

### 4.3 Governance Module

Manages the policy and compliance backbone of the organization.

**Key Features**
- ESG Policies — author, version, and publish governance policies
- Policy Acknowledgements — track which employees have read/accepted each policy, with reminder notifications for pending acknowledgements
- Audits — schedule and record internal/external audits by department
- Compliance Issues — log violations found during audits with Severity, Owner, and Due Date; issues open past their due date are automatically flagged and trigger notifications

**Core Django Models:** `ESGPolicy`, `PolicyAcknowledgement`, `Audit`, `ComplianceIssue`

### 4.4 Gamification Module

Drives employee engagement by turning sustainable behaviour into a rewarding, game-like experience.

**Key Features**
- Challenges — sustainability challenges with a full lifecycle: Draft → Active → Under Review → Completed, or Archived at any point; each has a Category, XP value, Difficulty, and optional Evidence Requirement
- Challenge Participation — employees track progress, submit proof, and receive XP once approved
- XP & Points — unified currency earned via CSR participation and Challenges
- Badges — auto-awarded when an employee's XP, completed-challenge count, or other tracked metric satisfies the Badge's Unlock Rule (when the Badge Auto-Award toggle is enabled)
- Rewards — a redeemable catalog (Name, Description, Points Required, Stock, Status); redemption deducts Points and decrements Stock, blocked if Stock is unavailable
- Leaderboards — department-wide and organization-wide rankings by XP/Points

**Core Django Models:** `Challenge`, `ChallengeParticipation`, `Badge`, `Reward`, `RewardRedemption`

### 4.4.1 Challenge Lifecycle State Machine

- **Draft:** Created by ESG Manager/Admin; not visible to employees.
- **Active:** Published and open for employee enrollment and proof submission.
- **Under Review:** Challenge deadline has passed or maximum capacity reached; pending submission approvals.
- **Completed:** Fully evaluated, XP distributed, and archived into past activity logs.
- **Archived:** Can be triggered from **any state** to immediately deprecate the challenge without deleting underlying historical data.

### 4.5 Dashboard & Scoring Engine

The aggregation layer that turns raw transactional data from the three pillars into scores decision-makers can act on.

**Key Features**
- Computes Environmental Score, Social Score, and Governance Score per Department from underlying transactions
- Rolls up to a Department Total Score, then an Overall ESG Score as a configurable weighted average (default: Environmental 40% / Social 30% / Governance 30%)
- Role-specific dashboard views: org-wide (Executive/ESG Manager), department-level (Department Head), personal (Employee)
- Department ESG rankings and smart visualizations (trend lines, radar charts for the 3 pillars, leaderboard widgets)

**Core Django Models:** `DepartmentScore` (Department, Environmental Score, Social Score, Governance Score, Total Score)

### 4.5.1 ESG Calculation Formula

$$\text{Department Total Score} = (S_E \times W_E) + (S_S \times W_S) + (S_G \times W_G)$$

*   $S_E, S_S, S_G$: Aggregated scores (0–100) calculated from Environmental, Social, and Governance transactional indicators respectively.
*   $W_E, W_S, W_G$: Configurable pillar weights stored in `ESGConfiguration` (Default: $W_E = 0.40$, $W_S = 0.30$, $W_G = 0.30$).
*   **Overall ESG Score:** The weighted average of all active `DepartmentTotalScore` values across the organization.

### 4.6 Reports Module

Turns platform data into shareable, exportable documents for internal review or external disclosure.

**Key Features**
- Standard reports: Environmental Report, Social Report, Governance Report, ESG Summary Report
- Custom Report Builder — combine filters (Department, Date Range, Module, Employee, Challenge, ESG Category) and export the result
- Export formats: PDF, Excel, CSV
- Report history / re-download of previously generated reports

**Core Django Models:** `ReportRequest` (filters snapshot, format, generated_by, generated_at, file)

### 4.7 Notifications Module

Keeps every role informed of items needing attention, without requiring them to poll the dashboard.

**Key Features**
- Triggers: new Compliance Issue raised, CSR/Challenge approval decisions, Policy Acknowledgement reminders, Badge unlocks, overdue Compliance Issues
- Delivery channels: in-app notification center and/or email, configurable per notification type in Settings
- Read/unread tracking per user

**Core Django Models:** `Notification` (recipient, type, message, channel, is_read, created_at)

### 4.8 Settings & Administration Module

Central configuration hub, primarily used by the Super Admin and ESG Manager.

**Key Features**
- Departments management — organizational hierarchy (Name, Code, Head, Parent Department, Employee Count, Status)
- Category management — shared values reused across Social (CSR Activity Category) and Gamification (Challenge Category)
- ESG Configuration — set pillar weighting for the Overall ESG Score, per-organization overrides
- Feature toggles — Auto Emission Calculation, Evidence Requirement, Badge Auto-Award
- Notification Settings — enable/disable channels per notification type

**Core Django Models:** `Department`, `Category`, `ESGConfiguration`, `FeatureToggle`, `NotificationSetting`

### 4.9 Authentication & User Management Module

The security backbone — every other module depends on this for identity and access control.

**Key Features**
- Login / logout, password reset, JWT/Token-based session handling for the React frontend
- Role assignment (Super Admin, ESG Manager, Department Head, Employee, Compliance Officer, Executive)
- Django Groups & Permissions mapped to DRF permission classes for per-endpoint access control
- User profile linked to Employee record and Department

**Core Django Models:** `User` (Django auth), `Employee`, `Role/Group`, `UserProfile`

---

## 5. Database Design Overview

The data model follows the Master Data / Transactional Data split from the problem statement, implemented as Django models with SQLite as the development database (the schema is designed to migrate cleanly to PostgreSQL for a production deployment).

### 5.1 Master Data Models

| Model | Key Fields |
|---|---|
| Department | Name, Code, Head, Parent Department (self-FK), Employee Count, Status |
| Category | Name, Type (CSR Activity / Challenge), Status |
| EmissionFactor | Name, Activity Type, CO2e Factor, Unit, Effective Date |
| ProductESGProfile | Product, linked Emission Factor(s), sustainability attributes |
| EnvironmentalGoal | Department, Metric, Target Value, Target Date, Progress |
| ESGPolicy | Title, Version, Body/Document, Published Date, Status |
| Badge | Name, Description, Unlock Rule, Icon |
| Reward | Name, Description, Points Required, Stock, Status |

### 5.2 Transactional Data Models

| Model | Key Fields |
|---|---|
| CarbonTransaction | Source (Purchase/Manufacturing/Expense/Fleet), Department, Emission Factor, Quantity, Calculated CO2e, Date |
| CSRActivity | Title, Category, Description, Date, Department, Status |
| EmployeeParticipation | Employee, Activity, Proof, Approval Status, Points Earned, Completion Date |
| Challenge | Title, Category, Description, XP, Difficulty, Evidence Required, Deadline, Status |
| ChallengeParticipation | Challenge, Employee, Progress, Proof, Approval, XP Awarded |
| PolicyAcknowledgement | Policy, Employee, Acknowledged Date, Status |
| Audit | Department, Auditor, Date, Scope, Status |
| ComplianceIssue | Audit, Severity, Description, Owner, Due Date, Status |
| RewardRedemption | Employee, Reward, Points Deducted, Date |
| DepartmentScore | Department, Environmental Score, Social Score, Governance Score, Total Score, Period |

**Relationships:** Department is the hub that most transactional records point to (directly or via Employee). EmployeeParticipation and ChallengeParticipation both feed into the Points/XP ledger that drives Badge Auto-Award and Leaderboards. DepartmentScore is a derived/aggregated model, recalculated whenever underlying transactions change (via Django signals or a scheduled job).

---

## 6. Business Workflow

The platform follows a linear data flow from configuration through to reporting:

1. **Master Configuration** — Departments, Categories, Emission Factors, Products, Goals, Policies, Challenges are set up first.
2. **Daily Business Operations** — Purchase, Manufacturing, Expenses, and Fleet activity happen as normal ERP transactions.
3. **Carbon Transactions** — emissions are calculated (manually or automatically) from those operations.
4. **Engagement Layer** — Employee Participation (CSR), Challenge Participation, Policy Acknowledgements, and Audits are recorded.
5. **Scoring** — Environmental, Social and Governance Scores are computed per Department.
6. **Aggregation** — Department Total Score, then the Overall ESG Score (weighted average, default 40/30/30), are computed.
7. **Delivery** — results surface on the Organization Dashboard and in exportable Reports.

---

## 7. Core Configuration & Business Rules

| Rule | Behaviour |
|---|---|
| Reward Redemption | Employees redeem Points/XP for a Reward from the catalog, subject to stock availability; redemption deducts Points from their balance and decrements Stock. |
| Notification System | Sends in-app and/or email alerts for: new Compliance Issue raised, CSR/Challenge approval decisions, Policy Acknowledgement reminders, and Badge unlocks. Configurable per type in Settings. |
| Auto Emission Calculation | When enabled, Carbon Transactions are calculated automatically from linked Purchase/Manufacturing/Expense/Fleet records using the relevant Emission Factor — no manual entry required. |
| Evidence Requirement | When enabled, CSR Activity participation cannot be marked Approved without an attached proof file. |
| Badge Auto-Award | When enabled, a Badge is automatically assigned the moment an employee's XP, completed-challenge count, or other tracked metric satisfies that Badge's Unlock Rule. |
| Compliance Issue Ownership | Every Compliance Issue must have an Owner and a Due Date; issues still Open past their Due Date are auto-flagged and feed the Notification System. |

---

## 8. Reports

EcoSphere generates the following reports, each downloadable as PDF, Excel, or CSV:

- Environmental Report
- Social Report
- Governance Report
- ESG Summary Report
- Custom Report Builder — combine filters and export a tailored report

**Available Filters:** Department, Date Range, Module, Employee, Challenge, ESG Category

---

## 9. Bonus / Future Enhancements

- Department ESG rankings with animated leaderboard transitions
- Smart dashboard visualizations (radar/spider chart across the 3 pillars, trend forecasting)
- Mobile-responsive interface (React responsive layout / PWA)
- Migration path from SQLite to PostgreSQL for production scaling
- Celery + Redis for asynchronous email notifications and scheduled score recalculation

### 9.1 Visual Architecture & Mockup Reference
- Interactive Wireframe Mockup: [EcoSphere Excalidraw Mockup](https://link.excalidraw.com/I/65VNwvy7c4X/2m6lz9Ln4)
---

## 10. Summary

EcoSphere converts ESG from a manual, periodic reporting exercise into a continuously updated, gamified, role-aware system built on Django, React, and SQLite. Six user roles (Super Admin, ESG Manager, Department Head, Employee, Compliance Officer, Executive) interact with nine modules covering Environmental, Social, Governance, Gamification, Dashboard/Scoring, Reports, Notifications, Settings/Administration, and Authentication. The result is a single platform where operational data, employee participation, and compliance activity feed directly into a live, weighted Overall ESG Score — exactly the integration gap the problem statement calls out in traditional ERP systems.
