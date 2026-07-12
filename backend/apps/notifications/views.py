from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
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

    @action(detail=True, methods=['patch'])
    def read(self, request, pk=None):
        notif = self.get_object()
        notif.is_read = True
        notif.save(update_fields=['is_read'])
        return Response({'status': 'Marked as read'})

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        employee = getattr(self.request.user, 'employee', None)
        if employee:
            Notification.objects.filter(recipient=employee, is_read=False).update(is_read=True)
            return Response({'status': 'All marked as read'})
        return Response({'status': 'Error'}, status=400)

class UnreadCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employee = getattr(self.request.user, 'employee', None)
        count = 0
        if employee:
            count = Notification.objects.filter(recipient=employee, is_read=False).count()
        return Response({'count': count})
