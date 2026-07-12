from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentScoreViewSet, DashboardOverviewView,
    DashboardAnalyticsView, DepartmentRankingView, ActivityFeedView
)

router = DefaultRouter()
router.register(r'scores', DepartmentScoreViewSet)

urlpatterns = [
    path('overview/', DashboardOverviewView.as_view(), name='dashboard-overview'),
    path('analytics/', DashboardAnalyticsView.as_view(), name='dashboard-analytics'),
    path('department-ranking/', DepartmentRankingView.as_view(), name='department-ranking'),
    path('activity-feed/', ActivityFeedView.as_view(), name='activity-feed'),
    path('', include(router.urls)),
]
