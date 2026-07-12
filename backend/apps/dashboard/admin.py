from django.contrib import admin
from .models import DepartmentScore


@admin.register(DepartmentScore)
class DepartmentScoreAdmin(admin.ModelAdmin):
    list_display = ('department', 'environmental_score', 'social_score', 'governance_score', 'total_score', 'period')
    list_filter = ('period', 'department')
    list_editable = ('environmental_score', 'social_score', 'governance_score', 'total_score')
    raw_id_fields = ('department',)
from django.contrib import admin

# Register your models here.
