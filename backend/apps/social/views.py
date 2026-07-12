from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import CSRActivity, EmployeeParticipation
from .serializers import CSRActivitySerializer, EmployeeParticipationSerializer

class CSRActivityViewSet(viewsets.ModelViewSet):
    queryset = CSRActivity.objects.all()
    serializer_class = CSRActivitySerializer
    permission_classes = [IsAuthenticated]

class EmployeeParticipationViewSet(viewsets.ModelViewSet):
    queryset = EmployeeParticipation.objects.all()
    serializer_class = EmployeeParticipationSerializer
    permission_classes = [IsAuthenticated]
