from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ESGPolicy, PolicyAcknowledgement, Audit, ComplianceIssue
from .serializers import ESGPolicySerializer, PolicyAcknowledgementSerializer, AuditSerializer, ComplianceIssueSerializer

class ESGPolicyViewSet(viewsets.ModelViewSet):
    queryset = ESGPolicy.objects.all()
    serializer_class = ESGPolicySerializer
    permission_classes = [IsAuthenticated]

class PolicyAcknowledgementViewSet(viewsets.ModelViewSet):
    queryset = PolicyAcknowledgement.objects.all()
    serializer_class = PolicyAcknowledgementSerializer
    permission_classes = [IsAuthenticated]

class AuditViewSet(viewsets.ModelViewSet):
    queryset = Audit.objects.all()
    serializer_class = AuditSerializer
    permission_classes = [IsAuthenticated]

class ComplianceIssueViewSet(viewsets.ModelViewSet):
    queryset = ComplianceIssue.objects.all()
    serializer_class = ComplianceIssueSerializer
    permission_classes = [IsAuthenticated]
