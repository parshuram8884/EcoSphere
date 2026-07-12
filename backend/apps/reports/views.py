from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ReportRequest
from .serializers import ReportRequestSerializer

class ReportRequestViewSet(viewsets.ModelViewSet):
    queryset = ReportRequest.objects.all()
    serializer_class = ReportRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # We assign generated_by to the current user's employee profile
        employee = getattr(self.request.user, 'employee', None)
        serializer.save(generated_by=employee)
