from django.db.models import Count, Q
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import ESGPolicy, PolicyAcknowledgement, Audit, ComplianceIssue
from .serializers import ESGPolicySerializer, PolicyAcknowledgementSerializer, AuditSerializer, ComplianceIssueSerializer

class ESGPolicyViewSet(viewsets.ModelViewSet):
    queryset = ESGPolicy.objects.all()
    serializer_class = ESGPolicySerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status']
    search_fields = ['title']

class PolicyAcknowledgementViewSet(viewsets.ModelViewSet):
    queryset = PolicyAcknowledgement.objects.select_related('policy', 'employee__user').all()
    serializer_class = PolicyAcknowledgementSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'policy', 'employee']

    @action(detail=True, methods=['patch'])
    def acknowledge(self, request, pk=None):
        ack = self.get_object()
        from django.utils.timezone import now
        ack.status = 'acknowledged'
        ack.acknowledged_date = now()
        ack.save()
        return Response({'status': 'Policy acknowledged.'})

class AuditViewSet(viewsets.ModelViewSet):
    queryset = Audit.objects.select_related('department', 'auditor__user').all()
    serializer_class = AuditSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'department']
    search_fields = ['scope']

class ComplianceIssueViewSet(viewsets.ModelViewSet):
    queryset = ComplianceIssue.objects.select_related('audit', 'owner__user').all()
    serializer_class = ComplianceIssueSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'severity', 'audit']
    search_fields = ['description']
    ordering_fields = ['due_date', 'severity']

class GovernanceSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        issues = ComplianceIssue.objects.all()
        
        open_count = issues.filter(status='open').count()
        closed_count = issues.filter(status='resolved').count()
        in_progress_count = issues.filter(status='in_progress').count()
        
        # Determine overdue (open/in_progress and past due date)
        from django.utils.timezone import now
        overdue_count = issues.filter(
            Q(status__in=['open', 'in_progress']) & Q(due_date__lt=now().date())
        ).count()

        severity_distribution = list(
            issues.values('severity')
            .annotate(count=Count('id'))
        )

        return Response({
            'issues': {
                'open': open_count,
                'in_progress': in_progress_count,
                'resolved': closed_count,
                'overdue': overdue_count,
            },
            'severity_distribution': severity_distribution
        })
