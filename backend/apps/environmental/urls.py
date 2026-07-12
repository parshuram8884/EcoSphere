from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmissionFactorViewSet, ProductESGProfileViewSet, 
    EnvironmentalGoalViewSet, CarbonTransactionViewSet,
    EnvironmentalDashboardView, CarbonTransactionStatsView
)

router = DefaultRouter()
router.register(r'emission-factors', EmissionFactorViewSet)
router.register(r'product-profiles', ProductESGProfileViewSet)
router.register(r'goals', EnvironmentalGoalViewSet)
router.register(r'transactions', CarbonTransactionViewSet)

urlpatterns = [
    path('dashboard/', EnvironmentalDashboardView.as_view(), name='env-dashboard'),
    path('transactions/stats/', CarbonTransactionStatsView.as_view(), name='env-transaction-stats'),
    path('', include(router.urls)),
]
