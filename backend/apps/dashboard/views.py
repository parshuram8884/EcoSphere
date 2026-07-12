from decimal import Decimal
from django.db.models import Sum, Count, Avg, Q
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import DepartmentScore
from .serializers import DepartmentScoreSerializer
from apps.environmental.models import CarbonTransaction, EnvironmentalGoal
from apps.social.models import CSRActivity, EmployeeParticipation
from apps.governance.models import ComplianceIssue, ESGPolicy, PolicyAcknowledgement
from apps.notifications.models import Notification
from apps.authentication.models import Employee


class DepartmentScoreViewSet(viewsets.ModelViewSet):
    queryset = DepartmentScore.objects.select_related('department').all()
    serializer_class = DepartmentScoreSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['department', 'period']


class DashboardOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        scores = DepartmentScore.objects.select_related('department').all()

        # Pillar averages
        avg = scores.aggregate(
            env=Avg('environmental_score'),
            soc=Avg('social_score'),
            gov=Avg('governance_score'),
            total=Avg('total_score'),
        )

        # CSR participation rate
        total_employees = Employee.objects.filter(status='active').count() or 1
        participating = EmployeeParticipation.objects.filter(approval_status='approved').values('employee').distinct().count()
        csr_pct = round((participating / total_employees) * 100)

        # Department rankings (top 6)
        departments = []
        for s in scores.order_by('-total_score')[:6]:
            departments.append({
                'name': s.department.name,
                'score': float(s.total_score),
                'env': float(s.environmental_score),
                'social': float(s.social_score),
                'gov': float(s.governance_score),
            })

        # Compliance summary
        open_issues = ComplianceIssue.objects.filter(status='open').count()
        resolved_issues = ComplianceIssue.objects.filter(status='resolved').count()

        # Recent activities (last 10 notifications)
        recent = list(
            Notification.objects.order_by('-created_at')[:10].values('message', 'type', 'created_at')
        )

        return Response({
            'overall_esg': {'value': round(avg['total'] or 0, 1), 'delta': '+4.3%'},
            'environmental': {'value': round(avg['env'] or 0, 1), 'delta': '+2.1%'},
            'social': {'value': round(avg['soc'] or 0, 1), 'delta': '+5.8%'},
            'governance': {'value': round(avg['gov'] or 0, 1), 'delta': '+3.4%'},
            'csr_participation_pct': csr_pct,
            'departments': departments,
            'recent_activities': recent,
            'compliance_summary': {
                'open': open_issues,
                'resolved': resolved_issues,
            }
        })


class DashboardAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Emissions by source
        source_breakdown = list(
            CarbonTransaction.objects.values('source')
            .annotate(total=Sum('calculated_co2e'), count=Count('id'))
            .order_by('-total')
        )

        # Total emissions
        total_emissions = CarbonTransaction.objects.aggregate(total=Sum('calculated_co2e'))['total'] or 0

        # Goals progress
        goals = list(EnvironmentalGoal.objects.select_related('department').values(
            'department__name', 'metric', 'target_value', 'progress'
        ))

        return Response({
            'total_emissions': float(total_emissions),
            'source_breakdown': source_breakdown,
            'goals': goals,
        })


class DepartmentRankingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        scores = DepartmentScore.objects.select_related('department').order_by('-total_score')
        rankings = []
        for rank, s in enumerate(scores, 1):
            rankings.append({
                'rank': rank,
                'name': s.department.name,
                'code': s.department.code,
                'total_score': float(s.total_score),
                'env': float(s.environmental_score),
                'social': float(s.social_score),
                'gov': float(s.governance_score),
            })
        return Response(rankings)


class ActivityFeedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifs = Notification.objects.select_related('recipient__user').order_by('-created_at')[:50]
        feed = []
        for n in notifs:
            feed.append({
                'id': n.id,
                'message': n.message,
                'type': n.type,
                'recipient': n.recipient.user.get_full_name() or n.recipient.user.username,
                'is_read': n.is_read,
                'created_at': n.created_at.isoformat() if n.created_at else None,
            })
        return Response(feed)
