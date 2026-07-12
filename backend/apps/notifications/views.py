from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users should only see their own notifications
        employee = getattr(self.request.user, 'employee', None)
        if employee:
            return Notification.objects.filter(recipient=employee).order_by('-created_at')
        return Notification.objects.none()
