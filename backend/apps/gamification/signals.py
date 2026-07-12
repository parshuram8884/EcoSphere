from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.gamification.models import ChallengeParticipation
from apps.gamification.utils import check_and_award_badges
from apps.notifications.utils import create_notification

@receiver(post_save, sender=ChallengeParticipation)
def handle_challenge_approval(sender, instance, created, **kwargs):
    if created:
        return
        
    if instance.approval_status == 'approved':
        employee = instance.employee
        employee.xp += instance.xp_awarded
        employee.points += instance.xp_awarded
        employee.save(update_fields=['xp', 'points'])
        
        check_and_award_badges(employee)
        
        create_notification(
            employee,
            'challenge_approval',
            f"Your submission for challenge '{instance.challenge.title}' has been APPROVED! You earned {instance.xp_awarded} XP."
        )
    elif instance.approval_status == 'rejected':
        create_notification(
            instance.employee,
            'challenge_approval',
            f"Your submission for challenge '{instance.challenge.title}' was rejected. Please review and re-submit."
        )
