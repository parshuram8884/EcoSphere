from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.governance.models import ComplianceIssue, ESGPolicy, PolicyAcknowledgement
from apps.authentication.models import Employee
from apps.notifications.utils import create_notification

@receiver(post_save, sender=ComplianceIssue)
def handle_new_compliance_issue(sender, instance, created, **kwargs):
    if created and instance.owner:
        create_notification(
            instance.owner,
            'compliance_issue',
            f"A new {instance.severity} severity compliance issue has been assigned to you. Due Date: {instance.due_date}."
        )

@receiver(post_save, sender=ESGPolicy)
def create_policy_acknowledgement_requests(sender, instance, created, **kwargs):
    if not created and instance.status == 'published':
        employees = Employee.objects.filter(status='active')
        for emp in employees:
            ack, ack_created = PolicyAcknowledgement.objects.get_or_create(
                policy=instance,
                employee=emp,
                defaults={'status': 'pending'}
            )
            if ack_created:
                create_notification(
                    emp,
                    'policy_reminder',
                    f"A new ESG Policy '{instance.title}' has been published. Please read and acknowledge it."
                )
