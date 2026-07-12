# EcoSphere — ESG Management Platform

## 1. Project Overview
Build an ESG Management Platform that enables organizations to measure, manage, and improve their Environmental, Social, and Governance performance. The platform should integrate operational data, employee participation, and compliance activities into a unified dashboard while encouraging sustainability through gamification.

## 2. Core Modules
* **Environmental:** Carbon accounting, emission factors, sustainability goals, and carbon reports.
* **Social:** CSR activities, employee participation, diversity metrics, and engagement.
* **Governance:** Policies, audits, compliance tracking, and governance reports.
* **Gamification:** Challenges, badges, XP, rewards, and leaderboards.

## 3. Data Model Summary
* **Master Data:** Department, Category, Emission Factor, Product ESG Profile, Environmental Goal, ESG Policy, Badge, Reward.
* **Transactional Data:** Carbon Transaction, CSR Activity, Employee Participation, Challenge, Challenge Participation, Policy Acknowledgement, Audit, Compliance Issue, Department Score.

## 4. Scoring Engine
* Calculates an **Overall ESG Score**.
* This score is a weighted average of Department Total Scores.
* Default weighting: Environmental 40% / Social 30% / Governance 30% (configurable per organization).

## 5. Key Business Rules
* **Reward Redemption:** Employees can redeem earned Points/XP for a Reward from the catalog, subject to stock availability.
* **Notification System:** Sends notifications (in-app and/or email) for new compliance issues, approval decisions, policy reminders, and badge unlocks.
* **Auto Emission Calculation:** When enabled, carbon transactions are calculated automatically from linked ERP records using relevant emission factors.
* **Evidence Requirement:** When enabled, CSR Activity participation requires an attached proof file for approval.
* **Badge Auto-Award:** When enabled, badges are automatically assigned when an employee meets the unlock rules.
* **Compliance Issue Ownership:** Every compliance issue must have an assigned Owner and a Due Date.

## 6. Reports & Bonus Features
* **Reports:** Environmental Report, Social Report, Governance Report, ESG Summary Report, and a Custom Report Builder (exportable to PDF, Excel, CSV).
* **Bonus Ideas:** Department ESG rankings, smart dashboard visualizations, and a mobile-responsive interface.
