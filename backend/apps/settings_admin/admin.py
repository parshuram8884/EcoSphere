from django.contrib import admin
from .models import Department, Category, ESGConfiguration, FeatureToggle, NotificationSetting


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'head', 'parent', 'employee_count', 'status')
    list_filter = ('status',)
    search_fields = ('name', 'code')
    list_editable = ('status', 'employee_count')
    raw_id_fields = ('head', 'parent')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'status')
    list_filter = ('type', 'status')
    search_fields = ('name',)
    list_editable = ('status',)


@admin.register(ESGConfiguration)
class ESGConfigurationAdmin(admin.ModelAdmin):
    list_display = ('environmental_weight', 'social_weight', 'governance_weight')


@admin.register(FeatureToggle)
class FeatureToggleAdmin(admin.ModelAdmin):
    list_display = ('auto_emission_calculation', 'evidence_requirement', 'badge_auto_award')


@admin.register(NotificationSetting)
class NotificationSettingAdmin(admin.ModelAdmin):
    list_display = ('employee', 'notification_type', 'channel')
    list_filter = ('channel', 'notification_type')
    raw_id_fields = ('employee',)
from django.contrib import admin

# Register your models here.
