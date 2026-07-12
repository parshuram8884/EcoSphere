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


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(max_length=150, required=False, default='')
    last_name = serializers.CharField(max_length=150, required=False, default='')
    role = serializers.ChoiceField(choices=Employee.ROLE_CHOICES, default='employee')
    department = serializers.IntegerField(required=False, allow_null=True, default=None)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        from apps.settings_admin.models import Department

        department_id = validated_data.pop('department', None)
        validated_data.pop('confirm_password')
        role = validated_data.pop('role', 'employee')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )

        department = None
        if department_id:
            try:
                department = Department.objects.get(pk=department_id)
            except Department.DoesNotExist:
                pass

        employee = Employee.objects.create(
            user=user,
            role=role,
            department=department,
        )
        return employee
