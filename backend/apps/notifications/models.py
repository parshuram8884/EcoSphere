from django.db import models

class Notification(models.Model):
    recipient = models.ForeignKey('authentication.Employee', on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=100) 
    message = models.TextField()
    channel = models.CharField(max_length=50, default='in_app') 
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification to {self.recipient.user.username} ({self.type}) - {'Read' if self.is_read else 'Unread'}"
