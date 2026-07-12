from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'department', 'status', 'xp', 'points')
    list_filter = ('role', 'status', 'department')
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'user__email')
    list_editable = ('role', 'status', 'xp', 'points')
    raw_id_fields = ('user', 'department')
from django.contrib import admin

# Register your models here.
