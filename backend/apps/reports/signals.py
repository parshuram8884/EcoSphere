from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.reports.models import ReportRequest
from apps.reports.report_generator import generate_pdf_report, generate_excel_report

@receiver(post_save, sender=ReportRequest)
def handle_report_request(sender, instance, created, **kwargs):
    if created:
        if instance.format == 'pdf':
            generate_pdf_report(instance)
        elif instance.format == 'excel':
            generate_excel_report(instance)
