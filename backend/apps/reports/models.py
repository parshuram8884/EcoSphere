from django.db import models

class ReportRequest(models.Model):
    FORMAT_CHOICES = [
        ('pdf', 'PDF'),
        ('excel', 'Excel'),
        ('csv', 'CSV'),
    ]

    filters_snapshot = models.JSONField(default=dict, blank=True)
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES)
    generated_by = models.ForeignKey('authentication.Employee', on_delete=models.SET_NULL, null=True)
    generated_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='reports/', null=True, blank=True)

    def __str__(self):
        return f"Report Request by {self.generated_by.user.username if self.generated_by else 'system'} at {self.generated_at}"
