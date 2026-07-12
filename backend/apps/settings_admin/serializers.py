from rest_framework import serializers
from .models import Department, Category, ESGConfiguration, FeatureToggle, NotificationSetting

class DepartmentSerializer(serializers.ModelSerializer):
    head_name = serializers.ReadOnlyField(source='head.user.username')
    parent_name = serializers.ReadOnlyField(source='parent.name')

    class Meta:
        model = Department
        fields = ['id', 'name', 'code', 'head', 'head_name', 'parent', 'parent_name', 'employee_count', 'status']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type', 'status']

class ESGConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ESGConfiguration
        fields = ['id', 'environmental_weight', 'social_weight', 'governance_weight']

class FeatureToggleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureToggle
        fields = ['id', 'auto_emission_calculation', 'evidence_requirement', 'badge_auto_award']

class NotificationSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationSetting
        fields = ['id', 'employee', 'notification_type', 'channel']
