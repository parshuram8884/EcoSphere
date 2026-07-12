from django.contrib import admin
from .models import ESGPolicy, PolicyAcknowledgement, Audit, ComplianceIssue


@admin.register(ESGPolicy)
class ESGPolicyAdmin(admin.ModelAdmin):
    list_display = ('title', 'version', 'status', 'published_date')
    list_filter = ('status',)
    search_fields = ('title', 'body')
    list_editable = ('status',)


@admin.register(PolicyAcknowledgement)
class PolicyAcknowledgementAdmin(admin.ModelAdmin):
    list_display = ('policy', 'employee', 'status', 'acknowledged_date')
    list_filter = ('status',)
    list_editable = ('status',)
    raw_id_fields = ('policy', 'employee')


@admin.register(Audit)
class AuditAdmin(admin.ModelAdmin):
    list_display = ('department', 'auditor', 'date', 'scope', 'status')
    list_filter = ('status', 'department')
    list_editable = ('status',)
    raw_id_fields = ('department', 'auditor')


@admin.register(ComplianceIssue)
class ComplianceIssueAdmin(admin.ModelAdmin):
    list_display = ('severity', 'description', 'audit', 'owner', 'due_date', 'status')
    list_filter = ('severity', 'status')
    list_editable = ('status',)
    raw_id_fields = ('audit', 'owner')
from django.contrib import admin

# Register your models here.
