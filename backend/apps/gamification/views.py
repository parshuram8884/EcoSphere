from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.db.models import Sum
from .models import Challenge, ChallengeParticipation, Badge, EmployeeBadge, Reward, RewardRedemption
from apps.authentication.models import Employee
from .serializers import (
    ChallengeSerializer, ChallengeParticipationSerializer, BadgeSerializer, 
    EmployeeBadgeSerializer, RewardSerializer, RewardRedemptionSerializer
)

class ChallengeViewSet(viewsets.ModelViewSet):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'difficulty', 'category']
    search_fields = ['title', 'description']

class ChallengeParticipationViewSet(viewsets.ModelViewSet):
    queryset = ChallengeParticipation.objects.select_related('challenge', 'employee__user').all()
    serializer_class = ChallengeParticipationSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['approval_status', 'employee', 'challenge']

    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        cp = self.get_object()
        if cp.approval_status == 'approved':
            return Response({'detail': 'Already approved.'}, status=status.HTTP_400_BAD_REQUEST)
        
        cp.approval_status = 'approved'
        cp.xp_awarded = cp.challenge.xp
        cp.save()
        
        # Award XP to employee
        emp = cp.employee
        emp.xp += cp.challenge.xp
        emp.points += round(cp.challenge.xp / 2) # Arbitrary point calculation
        emp.save(update_fields=['xp', 'points'])
        
        return Response({'status': 'Challenge participation approved.'})

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['name']

class EmployeeBadgeViewSet(viewsets.ModelViewSet):
    queryset = EmployeeBadge.objects.select_related('employee__user', 'badge').all()
    serializer_class = EmployeeBadgeSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['employee', 'badge']

class RewardViewSet(viewsets.ModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status']
    search_fields = ['name']

class RewardRedemptionViewSet(viewsets.ModelViewSet):
    queryset = RewardRedemption.objects.select_related('employee__user', 'reward').all()
    serializer_class = RewardRedemptionSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['employee', 'reward']

    def perform_create(self, serializer):
        reward = serializer.validated_data['reward']
        employee = serializer.validated_data['employee']
        
        # Deduct points and stock
        employee.points -= reward.points_required
        employee.save(update_fields=['points'])
        
        reward.stock -= 1
        reward.save(update_fields=['stock'])
        
        serializer.save(points_deducted=reward.points_required)

class LeaderboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Top 10 Employees
        employees = Employee.objects.select_related('user', 'department').order_by('-xp')[:10]
        top_employees = []
        for rank, emp in enumerate(employees, 1):
            top_employees.append({
                'rank': rank,
                'name': emp.user.get_full_name() or emp.user.username,
                'dept': emp.department.name if emp.department else 'N/A',
                'xp': emp.xp,
                'badges': emp.badges.count(),
            })

        # Department XP
        departments = Employee.objects.values('department__name').annotate(total_xp=Sum('xp')).order_by('-total_xp')
        dept_xp = []
        for d in departments:
            dept_xp.append({
                'name': d['department__name'] or 'Unknown',
                'xp': d['total_xp'] or 0
            })

        return Response({
            'employees': top_employees,
            'departments': dept_xp
        })
