from django.db.models.signals import pre_save
from django.dispatch import receiver
from apps.environmental.models import CarbonTransaction
from apps.settings_admin.models import FeatureToggle

@receiver(pre_save, sender=CarbonTransaction)
def calculate_carbon_emission(sender, instance, **kwargs):
    toggle = FeatureToggle.objects.first()
    if (not toggle or toggle.auto_emission_calculation) and instance.emission_factor:
        instance.calculated_co2e = instance.quantity * instance.emission_factor.co2e_factor
