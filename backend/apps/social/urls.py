from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CSRActivityViewSet, EmployeeParticipationViewSet, 
    TrainingViewSet, SocialDashboardView
)

router = DefaultRouter()
router.register(r'activities', CSRActivityViewSet)
router.register(r'participations', EmployeeParticipationViewSet)
router.register(r'training', TrainingViewSet)

urlpatterns = [
    path('dashboard/', SocialDashboardView.as_view(), name='social-dashboard'),
    path('', include(router.urls)),
]
