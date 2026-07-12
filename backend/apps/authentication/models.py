from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    ROLE_CHOICES = [
        ('super_admin', 'Super Admin'),
        ('esg_manager', 'ESG / Sustainability Manager'),
        ('dept_head', 'Department Head / Manager'),
        ('employee', 'Employee'),
        ('compliance_officer', 'Compliance Officer / Auditor'),
        ('executive', 'Executive / Viewer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee')
    department = models.ForeignKey('settings_admin.Department', on_delete=models.SET_NULL, null=True, blank=True, related_name='employees')
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='employee')
    xp = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default='active')

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} ({self.get_role_display()})"
