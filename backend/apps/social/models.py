from django.db import models

class CSRActivity(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=255)
    category = models.ForeignKey('settings_admin.Category', on_delete=models.SET_NULL, null=True, limit_choices_to={'type': 'csr'})
    description = models.TextField()
    date = models.DateField()
    department = models.ForeignKey('settings_admin.Department', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='draft')

    def __str__(self):
        return self.title

class EmployeeParticipation(models.Model):
    APPROVAL_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    employee = models.ForeignKey('authentication.Employee', on_delete=models.CASCADE, related_name='csr_participations')
    activity = models.ForeignKey(CSRActivity, on_delete=models.CASCADE, related_name='participations')
    proof = models.FileField(upload_to='proofs/csr/', null=True, blank=True)
    approval_status = models.CharField(max_length=50, choices=APPROVAL_CHOICES, default='pending')
    points_earned = models.IntegerField(default=0)
    completion_date = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ('employee', 'activity')

    def __str__(self):
        return f"{self.employee.user.username} in {self.activity.title} ({self.approval_status})"
