import datetime
from django.db.models import Sum
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from apps.environmental.models import CarbonTransaction, EnvironmentalGoal
from apps.social.models import EmployeeParticipation
from apps.governance.models import PolicyAcknowledgement, ComplianceIssue, ESGPolicy
from apps.dashboard.models import DepartmentScore
from apps.settings_admin.models import ESGConfiguration

def get_period_for_date(date_val):
    if not date_val:
        date_val = datetime.date.today()
    return f"{date_val.year}-Q{(date_val.month - 1) // 3 + 1}"

def get_quarter_dates(period):
    try:
        year = int(period[:4])
        q = int(period[6])
        if q == 1: return datetime.date(year, 1, 1), datetime.date(year, 3, 31)
        elif q == 2: return datetime.date(year, 4, 1), datetime.date(year, 6, 30)
        elif q == 3: return datetime.date(year, 7, 1), datetime.date(year, 9, 30)
        elif q == 4: return datetime.date(year, 10, 1), datetime.date(year, 12, 31)
    except Exception:
        pass
    today = datetime.date.today()
    return datetime.date(today.year, 1, 1), datetime.date(today.year, 12, 31)

def recalculate_department_score(department, period):
    if not department:
        return

    start_date, end_date = get_quarter_dates(period)

    # 1. Environmental Score
    emissions_sum = CarbonTransaction.objects.filter(
        department=department, date__range=(start_date, end_date)
    ).aggregate(total=Sum('calculated_co2e'))['total'] or 0

    goals = EnvironmentalGoal.objects.filter(department=department, target_date__range=(start_date, end_date))
    
    if goals.exists():
        target = goals.first().target_value
        if emissions_sum <= target:
            env_score = 100.0
        else:
            env_score = float(max(0, 100 - ((emissions_sum - target) / target) * 100))
    else:
        env_score = float(max(0, 100 - (emissions_sum / 50)))

    # 2. Social Score
    csr_approved = EmployeeParticipation.objects.filter(
        employee__department=department, approval_status='approved', completion_date__range=(start_date, end_date)
    ).count()

    emp_count = department.employees.count()
    if emp_count == 0:
        emp_count = department.employee_count or 1

    social_score = float(min(100, (csr_approved / emp_count) * 100))

    # 3. Governance Score
    published_policies = ESGPolicy.objects.filter(status='published')
    policy_count = published_policies.count()
    
    expected_acks = emp_count * policy_count
    if expected_acks > 0:
        actual_acks = PolicyAcknowledgement.objects.filter(
            employee__department=department, policy__status='published', status='acknowledged'
        ).count()
        ack_rate = (actual_acks / expected_acks) * 100.0
    else:
        ack_rate = 100.0

    open_issues = ComplianceIssue.objects.filter(audit__department=department, status='open')
    deductions = 0
    for issue in open_issues:
        sev = issue.severity.lower()
        if sev == 'critical': deductions += 25
        elif sev == 'high': deductions += 15
        elif sev == 'medium': deductions += 10
        elif sev == 'low': deductions += 5
            
    gov_issue_score = max(0, 100 - deductions)
    gov_score = float((ack_rate * 0.5) + (gov_issue_score * 0.5))

    # 4. Total score
    config = ESGConfiguration.objects.first()
    if not config:
        config = ESGConfiguration.objects.create(environmental_weight=40.0, social_weight=30.0, governance_weight=30.0)
        
    e_w = float(config.environmental_weight)
    s_w = float(config.social_weight)
    g_w = float(config.governance_weight)
    
    total_score = (env_score * e_w + social_score * s_w + gov_score * g_w) / 100.0

    DepartmentScore.objects.update_or_create(
        department=department,
        period=period,
        defaults={
            'environmental_score': env_score,
            'social_score': social_score,
            'governance_score': gov_score,
            'total_score': total_score
        }
    )

@receiver(post_save, sender=CarbonTransaction)
@receiver(post_delete, sender=CarbonTransaction)
def carbon_transaction_score_recalc(sender, instance, **kwargs):
    period = get_period_for_date(instance.date)
    recalculate_department_score(instance.department, period)

@receiver(post_save, sender=EmployeeParticipation)
@receiver(post_delete, sender=EmployeeParticipation)
def csr_participation_score_recalc(sender, instance, **kwargs):
    period = get_period_for_date(instance.completion_date or instance.activity.date)
    if instance.employee.department:
        recalculate_department_score(instance.employee.department, period)

@receiver(post_save, sender=PolicyAcknowledgement)
@receiver(post_delete, sender=PolicyAcknowledgement)
def policy_ack_score_recalc(sender, instance, **kwargs):
    period = get_period_for_date(instance.acknowledged_date or datetime.date.today())
    if instance.employee.department:
        recalculate_department_score(instance.employee.department, period)

@receiver(post_save, sender=ComplianceIssue)
@receiver(post_delete, sender=ComplianceIssue)
def compliance_issue_score_recalc(sender, instance, **kwargs):
    period = get_period_for_date(instance.due_date)
    if instance.audit.department:
        recalculate_department_score(instance.audit.department, period)
