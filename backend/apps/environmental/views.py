from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import EmissionFactor, ProductESGProfile, EnvironmentalGoal, CarbonTransaction
from .serializers import EmissionFactorSerializer, ProductESGProfileSerializer, EnvironmentalGoalSerializer, CarbonTransactionSerializer

class EmissionFactorViewSet(viewsets.ModelViewSet):
    queryset = EmissionFactor.objects.all()
    serializer_class = EmissionFactorSerializer
    permission_classes = [IsAuthenticated]

class ProductESGProfileViewSet(viewsets.ModelViewSet):
    queryset = ProductESGProfile.objects.all()
    serializer_class = ProductESGProfileSerializer
    permission_classes = [IsAuthenticated]

class EnvironmentalGoalViewSet(viewsets.ModelViewSet):
    queryset = EnvironmentalGoal.objects.all()
    serializer_class = EnvironmentalGoalSerializer
    permission_classes = [IsAuthenticated]

class CarbonTransactionViewSet(viewsets.ModelViewSet):
    queryset = CarbonTransaction.objects.all()
    serializer_class = CarbonTransactionSerializer
    permission_classes = [IsAuthenticated]
