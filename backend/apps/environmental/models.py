from django.db import models

class EmissionFactor(models.Model):
    name = models.CharField(max_length=255)
    activity_type = models.CharField(max_length=100)
    co2e_factor = models.DecimalField(max_digits=12, decimal_places=6)
    unit = models.CharField(max_length=50)
    effective_date = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.co2e_factor} per {self.unit})"

class ProductESGProfile(models.Model):
    product_name = models.CharField(max_length=255)
    emission_factors = models.ManyToManyField(EmissionFactor, related_name='products')
    sustainability_attributes = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.product_name

class EnvironmentalGoal(models.Model):
    department = models.ForeignKey('settings_admin.Department', on_delete=models.CASCADE, related_name='environmental_goals')
    metric = models.CharField(max_length=255)
    target_value = models.DecimalField(max_digits=12, decimal_places=2)
    target_date = models.DateField()
    progress = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.department.name} - {self.metric}: Target {self.target_value}"

class CarbonTransaction(models.Model):
    SOURCE_CHOICES = [
        ('purchase', 'Purchase'),
        ('manufacturing', 'Manufacturing'),
        ('expense', 'Expense'),
        ('fleet', 'Fleet'),
    ]

    source = models.CharField(max_length=50, choices=SOURCE_CHOICES)
    department = models.ForeignKey('settings_admin.Department', on_delete=models.CASCADE, related_name='carbon_transactions')
    emission_factor = models.ForeignKey(EmissionFactor, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    calculated_co2e = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.get_source_display()} Transaction for {self.department.name}"
