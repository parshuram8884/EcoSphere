from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    head = models.ForeignKey('authentication.Employee', on_delete=models.SET_NULL, null=True, blank=True, related_name='headed_departments')
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='child_departments')
    employee_count = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default='active')

    def __str__(self):
        return f"{self.name} ({self.code})"

class Category(models.Model):
    TYPE_CHOICES = [
        ('csr', 'CSR Activity'),
        ('challenge', 'Challenge'),
    ]
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    status = models.CharField(max_length=50, default='active')

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"

class ESGConfiguration(models.Model):
    environmental_weight = models.DecimalField(max_digits=5, decimal_places=2, default=40.0)
    social_weight = models.DecimalField(max_digits=5, decimal_places=2, default=30.0)
    governance_weight = models.DecimalField(max_digits=5, decimal_places=2, default=30.0)

    def __str__(self):
        return f"ESG Config (E: {self.environmental_weight}%, S: {self.social_weight}%, G: {self.governance_weight}%)"

class FeatureToggle(models.Model):
    auto_emission_calculation = models.BooleanField(default=True)
    evidence_requirement = models.BooleanField(default=True)
    badge_auto_award = models.BooleanField(default=True)

    def __str__(self):
        return f"Feature Toggles (Auto: {self.auto_emission_calculation}, Evidence: {self.evidence_requirement}, Badge: {self.badge_auto_award})"

class NotificationSetting(models.Model):
    employee = models.ForeignKey('authentication.Employee', on_delete=models.CASCADE, related_name='notification_settings')
    notification_type = models.CharField(max_length=100)
    channel = models.CharField(max_length=50, default='both')

    class Meta:
        unique_together = ('employee', 'notification_type')

    def __str__(self):
        return f"{self.employee.user.username} - {self.notification_type}: {self.channel}"
