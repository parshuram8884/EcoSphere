from apps.settings_admin.models import FeatureToggle
from apps.gamification.models import Badge, EmployeeBadge, ChallengeParticipation
from apps.social.models import EmployeeParticipation
from apps.notifications.utils import create_notification

def check_and_award_badges(employee):
    toggle = FeatureToggle.objects.first()
    if toggle and not toggle.badge_auto_award:
        return

    badges = Badge.objects.all()
    for badge in badges:
        if EmployeeBadge.objects.filter(employee=employee, badge=badge).exists():
            continue
            
        rule = badge.unlock_rule or {}
        earned = False
        
        if 'xp' in rule:
            if employee.xp >= rule['xp']:
                earned = True
        elif 'challenges_completed' in rule:
            completed_count = ChallengeParticipation.objects.filter(
                employee=employee,
                approval_status='approved'
            ).count()
            if completed_count >= rule['challenges_completed']:
                earned = True
        elif 'csr_completed' in rule:
            completed_count = EmployeeParticipation.objects.filter(
                employee=employee,
                approval_status='approved'
            ).count()
            if completed_count >= rule['csr_completed']:
                earned = True
                
        if earned:
            EmployeeBadge.objects.create(employee=employee, badge=badge)
            create_notification(
                employee,
                'badge_unlock',
                f"Congratulations! You unlocked the badge: '{badge.name}'!"
            )
