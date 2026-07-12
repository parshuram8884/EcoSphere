from django.contrib import admin
from .models import CSRActivity, EmployeeParticipation, Training


@admin.register(CSRActivity)
class CSRActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'department', 'date', 'status')
    list_filter = ('status', 'category', 'department')
    search_fields = ('title', 'description')
    list_editable = ('status',)
    raw_id_fields = ('category', 'department')


@admin.register(EmployeeParticipation)
class EmployeeParticipationAdmin(admin.ModelAdmin):
    list_display = ('employee', 'activity', 'approval_status', 'points_earned', 'completion_date')
    list_filter = ('approval_status',)
    list_editable = ('approval_status', 'points_earned')
    raw_id_fields = ('employee', 'activity')


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'completion_deadline', 'status')
    list_filter = ('status', 'department')
    search_fields = ('title',)
    list_editable = ('status',)
    raw_id_fields = ('department',)
    filter_horizontal = ('assigned_to',)
from django.contrib import admin

# Register your models here.
