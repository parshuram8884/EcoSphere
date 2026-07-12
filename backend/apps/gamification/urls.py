from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ChallengeViewSet, ChallengeParticipationViewSet, 
    BadgeViewSet, EmployeeBadgeViewSet, 
    RewardViewSet, RewardRedemptionViewSet,
    LeaderboardView
)

router = DefaultRouter()
router.register(r'challenges', ChallengeViewSet)
router.register(r'participations', ChallengeParticipationViewSet)
router.register(r'badges', BadgeViewSet)
router.register(r'employee-badges', EmployeeBadgeViewSet)
router.register(r'rewards', RewardViewSet)
router.register(r'redemptions', RewardRedemptionViewSet)

urlpatterns = [
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('', include(router.urls)),
]
