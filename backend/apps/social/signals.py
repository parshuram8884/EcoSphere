from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.social.models import EmployeeParticipation
from apps.gamification.utils import check_and_award_badges
from apps.notifications.utils import create_notification

@receiver(post_save, sender=EmployeeParticipation)
def handle_csr_approval(sender, instance, created, **kwargs):
    if created:
        return
        
    if instance.approval_status == 'approved':
        employee = instance.employee
        employee.points += instance.points_earned
        employee.xp += instance.points_earned 
        employee.save(update_fields=['points', 'xp'])
        
        check_and_award_badges(employee)
        
        create_notification(
            employee,
            'csr_approval',
            f"Your participation in '{instance.activity.title}' has been APPROVED! You earned {instance.points_earned} points."
        )
    elif instance.approval_status == 'rejected':
        create_notification(
            instance.employee,
            'csr_approval',
            f"Your participation in '{instance.activity.title}' was rejected. Please review and re-submit."
        )
