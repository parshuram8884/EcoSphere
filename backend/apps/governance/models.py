from django.db import models

class ESGPolicy(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=255)
    version = models.CharField(max_length=50)
    body = models.TextField()
    published_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='draft')

    def __str__(self):
        return f"{self.title} (v{self.version})"

class PolicyAcknowledgement(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('acknowledged', 'Acknowledged'),
    ]

    policy = models.ForeignKey(ESGPolicy, on_delete=models.CASCADE, related_name='acknowledgements')
    employee = models.ForeignKey('authentication.Employee', on_delete=models.CASCADE, related_name='policy_acknowledgements')
    acknowledged_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')

    class Meta:
        unique_together = ('policy', 'employee')

    def __str__(self):
        return f"{self.employee.user.username} - {self.policy.title}: {self.status}"

class Audit(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    department = models.ForeignKey('settings_admin.Department', on_delete=models.CASCADE, related_name='audits')
    auditor = models.ForeignKey('authentication.Employee', on_delete=models.SET_NULL, null=True, blank=True, related_name='conducted_audits')
    date = models.DateField()
    scope = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='scheduled')

    def __str__(self):
        return f"Audit for {self.department.name} on {self.date} ({self.status})"

class ComplianceIssue(models.Model):
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('resolved', 'Resolved'),
    ]

    audit = models.ForeignKey(Audit, on_delete=models.CASCADE, related_name='compliance_issues')
    severity = models.CharField(max_length=50, choices=SEVERITY_CHOICES)
    description = models.TextField()
    owner = models.ForeignKey('authentication.Employee', on_delete=models.SET_NULL, null=True, blank=True, related_name='owned_compliance_issues')
    due_date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='open')

    def __str__(self):
        return f"{self.severity} Issue: {self.description[:30]} ({self.status})"
