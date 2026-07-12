from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Employee

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    department_name = serializers.ReadOnlyField(source='department.name')
    department_code = serializers.ReadOnlyField(source='department.code')

    class Meta:
        model = Employee
        fields = ['id', 'user', 'department', 'department_name', 'department_code', 'role', 'xp', 'points', 'status']

class EmployeeBriefSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'username', 'full_name', 'role']

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
