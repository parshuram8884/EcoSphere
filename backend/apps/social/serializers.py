from rest_framework import serializers
from .models import CSRActivity, EmployeeParticipation
from apps.settings_admin.models import FeatureToggle

class CSRActivitySerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    department_name = serializers.ReadOnlyField(source='department.name')

    class Meta:
        model = CSRActivity
        fields = ['id', 'title', 'category', 'category_name', 'description', 'date', 'department', 'department_name', 'status']

class EmployeeParticipationSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    activity_title = serializers.ReadOnlyField(source='activity.title')
    activity_date = serializers.ReadOnlyField(source='activity.date')

    class Meta:
        model = EmployeeParticipation
        fields = ['id', 'employee', 'employee_name', 'activity', 'activity_title', 'activity_date', 'proof', 'approval_status', 'points_earned', 'completion_date']

    def get_employee_name(self, obj):
        return obj.employee.user.get_full_name() or obj.employee.user.username

    def validate(self, data):
        status = data.get('approval_status')
        toggle = FeatureToggle.objects.first()
        evidence_required = toggle.evidence_requirement if toggle else True

        if status == 'approved' and evidence_required:
            proof_file = data.get('proof') or (self.instance.proof if self.instance else None)
            if not proof_file:
                raise serializers.ValidationError({"proof": "Evidence/Proof file is required before approval."})
        return data
