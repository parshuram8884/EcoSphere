from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import DepartmentScore
from .serializers import DepartmentScoreSerializer

class DepartmentScoreViewSet(viewsets.ModelViewSet):
    queryset = DepartmentScore.objects.all()
    serializer_class = DepartmentScoreSerializer
    permission_classes = [IsAuthenticated]
