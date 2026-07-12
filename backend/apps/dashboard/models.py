from django.db import models

class DepartmentScore(models.Model):
    department = models.ForeignKey('settings_admin.Department', on_delete=models.CASCADE, related_name='scores')
    environmental_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    social_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    governance_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    total_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    period = models.CharField(max_length=50) 

    class Meta:
        unique_together = ('department', 'period')

    def __str__(self):
        return f"{self.department.name} Score for {self.period} - Total: {self.total_score}"
