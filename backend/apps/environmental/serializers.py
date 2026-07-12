from rest_framework import serializers
from .models import EmissionFactor, ProductESGProfile, EnvironmentalGoal, CarbonTransaction

class EmissionFactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmissionFactor
        fields = '__all__'

class ProductESGProfileSerializer(serializers.ModelSerializer):
    emission_factors_details = EmissionFactorSerializer(many=True, read_only=True, source='emission_factors')

    class Meta:
        model = ProductESGProfile
        fields = ['id', 'product_name', 'emission_factors', 'emission_factors_details', 'sustainability_attributes']

class EnvironmentalGoalSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source='department.name')

    class Meta:
        model = EnvironmentalGoal
        fields = ['id', 'department', 'department_name', 'metric', 'target_value', 'target_date', 'progress']

class CarbonTransactionSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source='department.name')
    emission_factor_name = serializers.ReadOnlyField(source='emission_factor.name')

    class Meta:
        model = CarbonTransaction
        fields = ['id', 'source', 'department', 'department_name', 'emission_factor', 'emission_factor_name', 'quantity', 'calculated_co2e', 'date']
        read_only_fields = ['calculated_co2e']
