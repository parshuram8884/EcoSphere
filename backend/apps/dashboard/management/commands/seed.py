import random
from datetime import date, timedelta
from decimal import Decimal
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.authentication.models import Employee
from apps.settings_admin.models import Department, Category, ESGConfiguration, FeatureToggle, NotificationSetting
from apps.environmental.models import EmissionFactor, ProductESGProfile, EnvironmentalGoal, CarbonTransaction
from apps.social.models import CSRActivity, EmployeeParticipation, Training
from apps.governance.models import ESGPolicy, PolicyAcknowledgement, Audit, ComplianceIssue
from apps.gamification.models import Challenge, ChallengeParticipation, Badge, EmployeeBadge, Reward, RewardRedemption
from apps.dashboard.models import DepartmentScore
from apps.reports.models import ReportRequest
from apps.notifications.models import Notification


class Command(BaseCommand):
    help = 'Seed the database with realistic demo data for all modules'

    def handle(self, *args, **options):
        self.stdout.write('[SEED] Seeding EcoSphere database...\n')

        # Clear existing data
        self._clear()

        # 1. Departments
        departments = self._seed_departments()
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(departments)} Departments'))

        # 2. Categories
        categories = self._seed_categories()
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(categories)} Categories'))

        # 3. Emission Factors
        factors = self._seed_emission_factors()
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(factors)} Emission Factors'))

        # 4. Employees
        employees = self._seed_employees(departments)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(employees)} Employees'))

        # 5. Carbon Transactions
        transactions = self._seed_carbon_transactions(departments, factors)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(transactions)} Carbon Transactions'))

        # 6. Environmental Goals
        goals = self._seed_environmental_goals(departments)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(goals)} Environmental Goals'))

        # 7. CSR Activities
        activities = self._seed_csr_activities(categories, departments)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(activities)} CSR Activities'))

        # 8. Employee Participations
        participations = self._seed_participations(employees, activities)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(participations)} Employee Participations'))

        # 9. ESG Policies
        policies = self._seed_policies()
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(policies)} ESG Policies'))

        # 10. Policy Acknowledgements
        acks = self._seed_acknowledgements(employees, policies)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(acks)} Policy Acknowledgements'))

        # 11. Audits
        audits = self._seed_audits(departments, employees)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(audits)} Audits'))

        # 12. Compliance Issues
        issues = self._seed_compliance_issues(audits, employees)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(issues)} Compliance Issues'))

        # 13. Challenges
        challenges = self._seed_challenges(categories)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(challenges)} Challenges'))

        # 14. Challenge Participations
        ch_parts = self._seed_challenge_participations(employees, challenges)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(ch_parts)} Challenge Participations'))

        # 15. Badges
        badges = self._seed_badges()
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(badges)} Badges'))

        # 16. Rewards
        rewards = self._seed_rewards()
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(rewards)} Rewards'))

        # 17. Department Scores
        scores = self._seed_department_scores(departments)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(scores)} Department Scores'))

        # 18. Notifications
        notifs = self._seed_notifications(employees)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(notifs)} Notifications'))

        # 19. ESG Configuration
        self._seed_esg_config()
        self.stdout.write(self.style.SUCCESS('  [OK] 1 ESG Configuration'))

        # 20. Feature Toggles
        self._seed_feature_toggles()
        self.stdout.write(self.style.SUCCESS('  [OK] 3 Feature Toggles'))

        # 21. Training
        training = self._seed_training(departments, employees)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(training)} Training Records'))

        # 22. Product ESG Profiles
        products = self._seed_products(factors)
        self.stdout.write(self.style.SUCCESS(f'  [OK] {len(products)} Product ESG Profiles'))

        self.stdout.write(self.style.SUCCESS('\n[DONE] Seeding complete!'))

    def _clear(self):
        Notification.objects.all().delete()
        ReportRequest.objects.all().delete()
        DepartmentScore.objects.all().delete()
        RewardRedemption.objects.all().delete()
        Reward.objects.all().delete()
        EmployeeBadge.objects.all().delete()
        Badge.objects.all().delete()
        ChallengeParticipation.objects.all().delete()
        Challenge.objects.all().delete()
        ComplianceIssue.objects.all().delete()
        Audit.objects.all().delete()
        PolicyAcknowledgement.objects.all().delete()
        ESGPolicy.objects.all().delete()
        EmployeeParticipation.objects.all().delete()
        CSRActivity.objects.all().delete()
        Training.objects.all().delete()
        EnvironmentalGoal.objects.all().delete()
        CarbonTransaction.objects.all().delete()
        ProductESGProfile.objects.all().delete()
        EmissionFactor.objects.all().delete()
        FeatureToggle.objects.all().delete()
        ESGConfiguration.objects.all().delete()
        NotificationSetting.objects.all().delete()
        Employee.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()
        Category.objects.all().delete()
        Department.objects.all().delete()

    def _seed_departments(self):
        data = [
            ('Research & Development', 'RND', None),
            ('Operations', 'OPS', None),
            ('Human Resources', 'HR', None),
            ('Logistics', 'LOG', None),
            ('Finance', 'FIN', None),
            ('Sustainability', 'SUS', None),
        ]
        depts = []
        for name, code, parent in data:
            d = Department.objects.create(name=name, code=code, status='active')
            depts.append(d)
        return depts

    def _seed_categories(self):
        data = [
            ('Tree Plantation', 'csr'), ('Blood Donation', 'csr'),
            ('Community Outreach', 'csr'), ('Beach Cleanup', 'csr'),
            ('Carbon Reduction', 'challenge'), ('Sustainability Sprint', 'challenge'),
            ('Green Transport', 'challenge'), ('Zero Waste', 'challenge'),
        ]
        return [Category.objects.create(name=n, type=t, status='active') for n, t in data]

    def _seed_emission_factors(self):
        data = [
            ('Grid Electricity', 'electricity', Decimal('0.324'), 'kWh'),
            ('Diesel Fuel', 'fuel', Decimal('2.68'), 'litre'),
            ('Natural Gas', 'gas', Decimal('2.021'), 'm³'),
            ('Petrol Fuel', 'fuel', Decimal('2.31'), 'litre'),
            ('Aviation Fuel', 'fuel', Decimal('3.15'), 'litre'),
            ('Purchased Steam', 'steam', Decimal('0.072'), 'kWh'),
            ('Mobile Refrigeration', 'refrigerant', Decimal('14.80'), 'kg'),
            ('Coal Combustion', 'combustion', Decimal('2.42'), 'kg'),
            ('LPG', 'gas', Decimal('1.51'), 'litre'),
            ('Waste to Landfill', 'waste', Decimal('0.59'), 'kg'),
        ]
        return [EmissionFactor.objects.create(
            name=n, activity_type=t, co2e_factor=f, unit=u, effective_date=date(2024, 1, 1)
        ) for n, t, f, u in data]

    def _seed_employees(self, departments):
        users_data = [
            ('marcus_thome', 'Marcus', 'Thome', 'super_admin', 0),
            ('sarah_chen', 'Sarah', 'Chen', 'esg_manager', 2),
            ('elena_vance', 'Elena', 'Vance', 'compliance_officer', 5),
            ('kevin_zhang', 'Kevin', 'Zhang', 'dept_head', 4),
            ('alex_rivera', 'Alex', 'Rivera', 'dept_head', 1),
            ('sarah_jenkins', 'Sarah', 'Jenkins', 'employee', 0),
            ('marcus_thorn', 'Marcus', 'Thorn', 'employee', 1),
            ('elena_rodriguez', 'Elena', 'Rodriguez', 'employee', 0),
            ('james_wilson', 'James', 'Wilson', 'employee', 2),
            ('lisa_park', 'Lisa', 'Park', 'employee', 3),
            ('raj_patel', 'Raj', 'Patel', 'employee', 4),
            ('emma_davis', 'Emma', 'Davis', 'employee', 5),
            ('david_kim', 'David', 'Kim', 'executive', 4),
            ('priya_sharma', 'Priya', 'Sharma', 'employee', 1),
            ('tom_brown', 'Tom', 'Brown', 'employee', 3),
        ]
        employees = []
        xp_values = [4250, 3820, 2750, 2950, 2800, 4250, 3820, 3120, 2500, 1800, 2100, 1500, 900, 2200, 1700]
        for i, (username, first, last, role, dept_idx) in enumerate(users_data):
            user = User.objects.create_user(
                username=username, password='EcoSphere123!',
                email=f'{username}@ecosphere.com',
                first_name=first, last_name=last
            )
            emp = Employee.objects.create(
                user=user, department=departments[dept_idx],
                role=role, xp=xp_values[i], points=xp_values[i] // 2
            )
            employees.append(emp)
        return employees

    def _seed_carbon_transactions(self, departments, factors):
        sources = ['purchase', 'manufacturing', 'expense', 'fleet']
        transactions = []
        for i in range(30):
            dept = random.choice(departments)
            factor = random.choice(factors)
            qty = Decimal(str(random.randint(10, 500)))
            co2e = qty * factor.co2e_factor
            tx = CarbonTransaction.objects.create(
                source=random.choice(sources),
                department=dept,
                emission_factor=factor,
                quantity=qty,
                calculated_co2e=co2e.quantize(Decimal('0.01')),
                date=date.today() - timedelta(days=random.randint(0, 365))
            )
            transactions.append(tx)
        return transactions

    def _seed_environmental_goals(self, departments):
        metrics = ['Carbon Reduction', 'Renewable Energy Target', 'Waste Diversion', 'Fleet Electrification', 'Water Usage Reduction', 'Energy Efficiency']
        goals = []
        for i, dept in enumerate(departments):
            progress = Decimal(str(random.randint(20, 90)))
            g = EnvironmentalGoal.objects.create(
                department=dept, metric=metrics[i],
                target_value=Decimal('100.00'),
                target_date=date(2026, 12, 31),
                progress=progress
            )
            goals.append(g)
        return goals

    def _seed_csr_activities(self, categories, departments):
        csr_cats = [c for c in categories if c.type == 'csr']
        titles = [
            'Annual Tree Plantation Drive', 'Community Blood Donation Camp',
            'Beach Cleanup Initiative', 'Digital Literacy Workshop',
            'Food Distribution Program', 'Eco-Friendly Office Challenge',
            'Mentorship Program', 'Recycling Awareness Campaign'
        ]
        activities = []
        statuses = ['active', 'active', 'active', 'completed', 'active', 'draft', 'completed', 'active']
        for i, title in enumerate(titles):
            a = CSRActivity.objects.create(
                title=title, category=random.choice(csr_cats),
                description=f'Organization-wide {title.lower()} for sustainability.',
                date=date.today() - timedelta(days=random.randint(0, 180)),
                department=random.choice(departments),
                status=statuses[i]
            )
            activities.append(a)
        return activities

    def _seed_participations(self, employees, activities):
        parts = []
        statuses = ['approved', 'approved', 'pending', 'rejected', 'approved']
        for i in range(20):
            emp = employees[i % len(employees)]
            act = activities[i % len(activities)]
            try:
                s = statuses[i % len(statuses)]
                p = EmployeeParticipation.objects.create(
                    employee=emp, activity=act,
                    approval_status=s,
                    points_earned=50 if s == 'approved' else 0,
                    completion_date=date.today() - timedelta(days=random.randint(0, 90)) if s == 'approved' else None
                )
                parts.append(p)
            except Exception:
                pass
        return parts

    def _seed_policies(self):
        data = [
            ('Global Anti-Bribery Code', 'v4.1', 'active'),
            ('Whistleblower Protection Policy', 'v3.2', 'under_review'),
            ('Data Privacy & Governance Charter', 'v2.0', 'active'),
            ('Supply Chain Code of Conduct', 'v1.5', 'draft'),
            ('Environmental Compliance Framework', 'v5.0', 'active'),
        ]
        return [ESGPolicy.objects.create(
            title=t, version=v, status=s,
            body=f'Full text of {t}...',
            published_date=date.today() - timedelta(days=random.randint(30, 365))
        ) for t, v, s in data]

    def _seed_acknowledgements(self, employees, policies):
        acks = []
        for policy in policies:
            for emp in employees[:5]:
                ack = PolicyAcknowledgement.objects.create(
                    policy=policy, employee=emp,
                    status=random.choice(['acknowledged', 'acknowledged', 'pending']),
                    acknowledged_date=date.today() - timedelta(days=random.randint(0, 60))
                )
                acks.append(ack)
        return acks

    def _seed_audits(self, departments, employees):
        auditors = [e for e in employees if e.role in ('compliance_officer', 'esg_manager')]
        if not auditors:
            auditors = employees[:2]
        data = [
            ('Q1 2024 Environmental Audit', 'completed'),
            ('Q2 2024 Governance Review', 'in_progress'),
            ('Annual ISO 14001 Compliance', 'scheduled'),
            ('Supply Chain ESG Assessment', 'completed'),
        ]
        return [Audit.objects.create(
            department=random.choice(departments),
            auditor=random.choice(auditors),
            date=date.today() - timedelta(days=random.randint(0, 180)),
            scope=t, status=s
        ) for t, s in data]

    def _seed_compliance_issues(self, audits, employees):
        issues_data = [
            ('Hazardous waste disposal non-compliance', 'high', 'open'),
            ('Missing emission documentation for Q3', 'medium', 'open'),
            ('Supplier audit findings unresolved', 'high', 'in_progress'),
            ('Training completion below threshold', 'low', 'resolved'),
            ('GHG reporting delay', 'medium', 'open'),
            ('Safety equipment certification expired', 'critical', 'open'),
            ('Water discharge permit renewal pending', 'high', 'in_progress'),
            ('Vehicle fleet emission standards gap', 'medium', 'resolved'),
            ('Chemical storage labeling deficiency', 'low', 'open'),
            ('Energy audit recommendations pending', 'medium', 'open'),
        ]
        issues = []
        for desc, sev, status in issues_data:
            issue = ComplianceIssue.objects.create(
                audit=random.choice(audits),
                severity=sev, description=desc,
                owner=random.choice(employees),
                due_date=date.today() + timedelta(days=random.randint(-30, 60)),
                status=status
            )
            issues.append(issue)
        return issues

    def _seed_challenges(self, categories):
        ch_cats = [c for c in categories if c.type == 'challenge']
        data = [
            ('30-Day Zero Plastic Sprint', 'active', 500, 'hard'),
            ('Carpool Synergy Week', 'active', 150, 'easy'),
            ('Green Travel Commute Challenge', 'draft', 300, 'medium'),
            ('Paperless Office Month', 'active', 200, 'medium'),
            ('Energy Conservation Sprint', 'completed', 400, 'hard'),
            ('Sustainable Procurement Challenge', 'under_review', 250, 'medium'),
        ]
        return [Challenge.objects.create(
            title=t, category=random.choice(ch_cats),
            description=f'Join the {t.lower()} and earn XP!',
            xp=xp, difficulty=d, status=s,
            evidence_required=True,
            deadline=date.today() + timedelta(days=random.randint(7, 90))
        ) for t, s, xp, d in data]

    def _seed_challenge_participations(self, employees, challenges):
        parts = []
        active_challenges = [c for c in challenges if c.status in ('active', 'completed')]
        for i in range(15):
            emp = employees[i % len(employees)]
            ch = active_challenges[i % len(active_challenges)] if active_challenges else challenges[0]
            try:
                progress = random.randint(0, 100)
                approved = progress == 100
                cp = ChallengeParticipation.objects.create(
                    challenge=ch, employee=emp,
                    progress=progress,
                    approval_status='approved' if approved else 'pending',
                    xp_awarded=ch.xp if approved else 0
                )
                parts.append(cp)
            except Exception:
                pass
        return parts

    def _seed_badges(self):
        data = [
            ('Paperless Pioneer', 'Log 10 consecutive digital transactions.', {'type': 'transactions', 'count': 10}),
            ('Carbon Combatant', 'Reduce individual carbon footprint by 15%.', {'type': 'carbon_reduction', 'pct': 15}),
            ('Net-Zero Superhero', 'Achieve zero emissions for 3 consecutive months.', {'type': 'zero_emission_months', 'count': 3}),
            ('CSR Contributor', 'Log 20 hours of volunteer service.', {'type': 'volunteer_hours', 'count': 20}),
            ('Compliance Champion', 'Perfect score on all compliance training.', {'type': 'training_score', 'pct': 100}),
        ]
        return [Badge.objects.create(
            name=n, description=d, unlock_rule=r
        ) for n, d, r in data]

    def _seed_rewards(self):
        data = [
            ('Extra Day Off', 'One additional paid day off.', 500, 10),
            ('Gift Card $50', '$50 gift card for sustainable brands.', 250, 20),
            ('Eco Merchandise Pack', 'Branded sustainable merchandise bundle.', 150, 50),
            ('Charity Donation', '$100 donated to charity of your choice.', 300, 100),
        ]
        return [Reward.objects.create(
            name=n, description=d, points_required=p, stock=s, status='active'
        ) for n, d, p, s in data]

    def _seed_department_scores(self, departments):
        scores = []
        for dept in departments:
            env = Decimal(str(random.randint(60, 95)))
            soc = Decimal(str(random.randint(60, 95)))
            gov = Decimal(str(random.randint(60, 95)))
            total = (env * Decimal('0.40') + soc * Decimal('0.30') + gov * Decimal('0.30')).quantize(Decimal('0.01'))
            s = DepartmentScore.objects.create(
                department=dept,
                environmental_score=env, social_score=soc,
                governance_score=gov, total_score=total,
                period='2024-Q4'
            )
            scores.append(s)
        return scores

    def _seed_notifications(self, employees):
        types = [
            ('compliance_issue', 'New compliance issue raised: Hazardous waste disposal.'),
            ('badge_unlock', 'Congratulations! You earned the Paperless Pioneer badge.'),
            ('approval', 'Your CSR participation in Tree Plantation was approved.'),
            ('policy_reminder', 'Reminder: Please acknowledge the Data Privacy Charter.'),
            ('challenge_update', 'The Zero Plastic Sprint challenge is ending in 3 days.'),
        ]
        notifs = []
        for i in range(20):
            emp = employees[i % len(employees)]
            ntype, msg = types[i % len(types)]
            n = Notification.objects.create(
                recipient=emp, type=ntype,
                message=msg, channel='in_app',
                is_read=random.choice([True, False, False])
            )
            notifs.append(n)
        return notifs

    def _seed_esg_config(self):
        ESGConfiguration.objects.create(
            environmental_weight=Decimal('0.40'),
            social_weight=Decimal('0.30'),
            governance_weight=Decimal('0.30')
        )

    def _seed_feature_toggles(self):
        FeatureToggle.objects.create(
            auto_emission_calculation=True,
            evidence_requirement=True,
            badge_auto_award=True
        )

    def _seed_training(self, departments, employees):
        data = [
            ('ESG Fundamentals', 'Introduction to Environmental, Social, and Governance principles.'),
            ('Carbon Accounting 101', 'Understanding emission scopes and measurement.'),
            ('Workplace Safety Compliance', 'Annual safety protocols and emergency procedures.'),
            ('Anti-Bribery Training', 'Ethics and anti-corruption awareness.'),
            ('Data Privacy Essentials', 'GDPR and data handling best practices.'),
            ('Sustainable Procurement', 'Selecting vendors with ESG alignment.'),
        ]
        trainings = []
        statuses = ['completed', 'active', 'active', 'completed', 'active', 'expired']
        for i, (title, desc) in enumerate(data):
            t = Training.objects.create(
                title=title, description=desc,
                department=departments[i % len(departments)],
                completion_deadline=date.today() + timedelta(days=random.randint(-30, 90)),
                status=statuses[i]
            )
            t.assigned_to.set(employees[:random.randint(5, 10)])
            trainings.append(t)
        return trainings

    def _seed_products(self, factors):
        data = [
            ('Industrial Motor Assembly', {'recyclable': True, 'energy_rating': 'A'}),
            ('Packaging Material (Corrugated)', {'recyclable': True, 'biodegradable': True}),
            ('Fleet Vehicle (Diesel)', {'emission_class': 'Euro 6', 'electric': False}),
            ('Office Supplies Bundle', {'sustainable_sourced': True}),
        ]
        products = []
        for name, attrs in data:
            p = ProductESGProfile.objects.create(
                product_name=name,
                sustainability_attributes=attrs
            )
            p.emission_factors.set(random.sample(list(factors), min(3, len(factors))))
            products.append(p)
        return products
