from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ESGPolicyViewSet, PolicyAcknowledgementViewSet, 
    AuditViewSet, ComplianceIssueViewSet, GovernanceSummaryView
)

router = DefaultRouter()
router.register(r'policies', ESGPolicyViewSet)
router.register(r'acknowledgements', PolicyAcknowledgementViewSet)
router.register(r'audits', AuditViewSet)
router.register(r'issues', ComplianceIssueViewSet)

urlpatterns = [
    path('summary/', GovernanceSummaryView.as_view(), name='governance-summary'),
    path('', include(router.urls)),
]
