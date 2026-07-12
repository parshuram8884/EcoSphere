from django.db.models import Sum, Count, Avg
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import CSRActivity, EmployeeParticipation, Training
from .serializers import CSRActivitySerializer, EmployeeParticipationSerializer, TrainingSerializer

class CSRActivityViewSet(viewsets.ModelViewSet):
    queryset = CSRActivity.objects.select_related('category', 'department').all()
    serializer_class = CSRActivitySerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['category', 'status', 'department']
    search_fields = ['title', 'description']

class EmployeeParticipationViewSet(viewsets.ModelViewSet):
    queryset = EmployeeParticipation.objects.select_related('employee__user', 'activity').all()
    serializer_class = EmployeeParticipationSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['approval_status', 'employee', 'activity']

    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        participation = self.get_object()
        if participation.approval_status == 'approved':
            return Response({'detail': 'Already approved.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # In a real scenario, points might be calculated based on the activity or input
        # For simplicity, we just award a fixed amount of points if not specified
        points_to_award = request.data.get('points', 50)
        
        participation.approval_status = 'approved'
        participation.points_earned = points_to_award
        participation.save()
        
        # Award points to employee
        emp = participation.employee
        emp.points += points_to_award
        emp.xp += points_to_award * 2  # arbitrary XP multiplier for CSR
        emp.save(update_fields=['points', 'xp'])
        
        return Response({'status': 'Participation approved.'})

    @action(detail=True, methods=['patch'])
    def reject(self, request, pk=None):
        participation = self.get_object()
        participation.approval_status = 'rejected'
        participation.save(update_fields=['approval_status'])
        return Response({'status': 'Participation rejected.'})

class TrainingViewSet(viewsets.ModelViewSet):
    queryset = Training.objects.select_related('department').all()
    serializer_class = TrainingSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'department']
    search_fields = ['title']

class SocialDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Stats based on approved participations
        approved = EmployeeParticipation.objects.filter(approval_status='approved')
        
        # Arbitrary calculation for volunteer hours: assume 2 hours per participation for demo
        volunteer_hours = approved.count() * 2
        
        from apps.authentication.models import Employee
        total_employees = Employee.objects.filter(status='active').count() or 1
        participating = approved.values('employee').distinct().count()
        engagement_rate = round((participating / total_employees) * 100)

        # CSR activities by category
        from apps.settings_admin.models import Category
        activities_breakdown = list(
            CSRActivity.objects.values('category__name')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        for act in activities_breakdown:
            act['name'] = act.pop('category__name') or 'Uncategorized'
            act['value'] = act.pop('count')

        return Response({
            'volunteer_hours': volunteer_hours,
            'engagement_rate': engagement_rate,
            'activities_breakdown': activities_breakdown,
        })
