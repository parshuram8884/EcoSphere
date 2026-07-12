from rest_framework import serializers
from .models import DepartmentScore

class DepartmentScoreSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source='department.name')

    class Meta:
        model = DepartmentScore
        fields = ['id', 'department', 'department_name', 'environmental_score', 'social_score', 'governance_score', 'total_score', 'period']
