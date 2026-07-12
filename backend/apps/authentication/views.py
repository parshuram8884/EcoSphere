from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Employee
from .serializers import EmployeeSerializer, RegisterSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            # Generate JWT tokens for the newly registered user
            refresh = RefreshToken.for_user(employee.user)
            return Response({
                'message': 'Registration successful.',
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                },
                'user': {
                    'id': employee.user.id,
                    'username': employee.user.username,
                    'email': employee.user.email,
                    'first_name': employee.user.first_name,
                    'last_name': employee.user.last_name,
                    'role': employee.role,
                    'employee_id': employee.id,
                    'department': employee.department_id,
                    'department_name': employee.department.name if employee.department else None,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            employee = user.employee
        except Employee.DoesNotExist:
            return Response({'detail': 'Employee profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': employee.role,
            'employee_id': employee.id,
            'department': employee.department_id,
            'department_name': employee.department.name if employee.department else None,
            'xp': employee.xp,
            'points': employee.points,
            'status': employee.status,
        })
