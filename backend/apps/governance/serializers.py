from rest_framework import serializers
from .models import ESGPolicy, PolicyAcknowledgement, Audit, ComplianceIssue

class ESGPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = ESGPolicy
        fields = ['id', 'title', 'version', 'body', 'published_date', 'status']

class PolicyAcknowledgementSerializer(serializers.ModelSerializer):
    policy_title = serializers.ReadOnlyField(source='policy.title')
    employee_name = serializers.SerializerMethodField()

    class Meta:
        model = PolicyAcknowledgement
        fields = ['id', 'policy', 'policy_title', 'employee', 'employee_name', 'acknowledged_date', 'status']

    def get_employee_name(self, obj):
        return obj.employee.user.get_full_name() or obj.employee.user.username

class AuditSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source='department.name')
    auditor_name = serializers.SerializerMethodField()

    class Meta:
        model = Audit
        fields = ['id', 'department', 'department_name', 'auditor', 'auditor_name', 'date', 'scope', 'status']

    def get_auditor_name(self, obj):
        if obj.auditor:
            return obj.auditor.user.get_full_name() or obj.auditor.user.username
        return None

class ComplianceIssueSerializer(serializers.ModelSerializer):
    audit_scope = serializers.ReadOnlyField(source='audit.scope')
    department_name = serializers.ReadOnlyField(source='audit.department.name')
    owner_name = serializers.SerializerMethodField()

    class Meta:
        model = ComplianceIssue
        fields = ['id', 'audit', 'audit_scope', 'department_name', 'severity', 'description', 'owner', 'owner_name', 'due_date', 'status']

    def get_owner_name(self, obj):
        if obj.owner:
            return obj.owner.user.get_full_name() or obj.owner.user.username
        return None
