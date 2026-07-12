from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Challenge, ChallengeParticipation, Badge, EmployeeBadge, Reward, RewardRedemption
from .serializers import (
    ChallengeSerializer, ChallengeParticipationSerializer, BadgeSerializer, 
    EmployeeBadgeSerializer, RewardSerializer, RewardRedemptionSerializer
)

class ChallengeViewSet(viewsets.ModelViewSet):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [IsAuthenticated]

class ChallengeParticipationViewSet(viewsets.ModelViewSet):
    queryset = ChallengeParticipation.objects.all()
    serializer_class = ChallengeParticipationSerializer
    permission_classes = [IsAuthenticated]

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [IsAuthenticated]

class EmployeeBadgeViewSet(viewsets.ModelViewSet):
    queryset = EmployeeBadge.objects.all()
    serializer_class = EmployeeBadgeSerializer
    permission_classes = [IsAuthenticated]

class RewardViewSet(viewsets.ModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer
    permission_classes = [IsAuthenticated]

class RewardRedemptionViewSet(viewsets.ModelViewSet):
    queryset = RewardRedemption.objects.all()
    serializer_class = RewardRedemptionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        reward = serializer.validated_data['reward']
        employee = serializer.validated_data['employee']
        
        # Deduct points and stock
        employee.points -= reward.points_required
        employee.save(update_fields=['points'])
        
        reward.stock -= 1
        reward.save(update_fields=['stock'])
        
        serializer.save(points_deducted=reward.points_required)
