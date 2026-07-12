# [cite_start]EcoSphere — ESG Management Platform [cite: 2]

## 1. Project Overview
[cite_start]Build an ESG Management Platform that enables organizations to measure, manage and improve their Environmental, Social and Governance performance[cite: 9]. [cite_start]The platform should integrate operational data, employee participation and compliance activities into a unified dashboard while encouraging sustainability through gamification[cite: 10].

## 2. Core Modules
* [cite_start]**Environmental:** Carbon accounting, emission factors, sustainability goals and carbon reports[cite: 12].
* [cite_start]**Social:** CSR activities, employee participation, diversity metrics and engagement[cite: 13].
* [cite_start]**Governance:** Policies, audits, compliance tracking and governance reports[cite: 14].
* [cite_start]**Gamification:** Challenges, badges, XP, rewards and leaderboards[cite: 14].

## 3. Data Model Summary
* [cite_start]**Master Data:** Department, Category, Emission Factor, Product ESG Profile, Environmental Goal, ESG Policy, Badge, Reward[cite: 18].
* [cite_start]**Transactional Data:** Carbon Transaction, CSR Activity, Employee Participation, Challenge, Challenge Participation, Policy Acknowledgement, Audit, Compliance Issue, Department Score[cite: 21].

## 4. Scoring Engine
* [cite_start]Calculates an Overall ESG Score[cite: 37]. 
* [cite_start]This is a weighted average of Department Total Scores - default weighting: Environmental 40% / Social 30% / Governance 30%, configurable per organization[cite: 38, 39].

## 5. Key Business Rules
* [cite_start]**Reward Redemption:** Employees can redeem earned Points/XP for a Reward from the catalog, subject to stock availability[cite: 88].
* [cite_start]**Notification System:** The platform sends notifications (in-app and/or email) for at least: new compliance issue raised, CSR/Challenge approval decisions, policy acknowledgement reminders, and badge unlocks[cite: 90].
* [cite_start]**Auto Emission Calculation:** When enabled, Carbon Transactions are calculated automatically from linked Purchase/Manufacturing/Expense/Fleet records using the relevant Emission Factor[cite: 92, 93].
* [cite_start]**Evidence Requirement:** When enabled, CSR Activity participation cannot be marked Approved without an attached proof file[cite: 94].
* [cite_start]**Badge Auto-Award:** When enabled, a Badge is automatically assigned to an employee the moment their XP, completed-challenge count, or other tracked metric satisfies that Badge's Unlock Rule[cite: 95, 96, 97].
* [cite_start]**Compliance Issue Ownership:** Every Compliance Issue must have an assigned Owner and a Due Date[cite: 98].

## 6. Reports & Bonus Features
* [cite_start]**Reports:** Environmental Report, Social Report, Governance Report, ESG Summary Report, and a Custom Report Builder[cite: 73, 74, 75, 76, 77]. 
* [cite_start]**Bonus Ideas:** Department ESG rankings, smart dashboard visualizations, and a mobile-responsive interface[cite: 102, 103, 104].
