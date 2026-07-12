from django.contrib import admin
from .models import ReportRequest


@admin.register(ReportRequest)
class ReportRequestAdmin(admin.ModelAdmin):
    list_display = ('generated_by', 'format', 'generated_at', 'file')
    list_filter = ('format',)
    raw_id_fields = ('generated_by',)
from django.contrib import admin

# Register your models here.
