from django.contrib import admin
from .models import EmissionFactor, ProductESGProfile, EnvironmentalGoal, CarbonTransaction


@admin.register(EmissionFactor)
class EmissionFactorAdmin(admin.ModelAdmin):
    list_display = ('name', 'activity_type', 'co2e_factor', 'unit', 'effective_date')
    list_filter = ('activity_type',)
    search_fields = ('name', 'activity_type')
    list_editable = ('co2e_factor', 'unit', 'effective_date')


@admin.register(ProductESGProfile)
class ProductESGProfileAdmin(admin.ModelAdmin):
    list_display = ('product_name',)
    search_fields = ('product_name',)
    filter_horizontal = ('emission_factors',)


@admin.register(EnvironmentalGoal)
class EnvironmentalGoalAdmin(admin.ModelAdmin):
    list_display = ('department', 'metric', 'target_value', 'target_date', 'progress')
    list_filter = ('department', 'metric')
    list_editable = ('progress',)
    raw_id_fields = ('department',)


@admin.register(CarbonTransaction)
class CarbonTransactionAdmin(admin.ModelAdmin):
    list_display = ('source', 'department', 'quantity', 'calculated_co2e', 'date')
    list_filter = ('source', 'department')
    list_editable = ('quantity', 'calculated_co2e')
    raw_id_fields = ('department', 'emission_factor')
from django.contrib import admin

# Register your models here.
