from apps.notifications.models import Notification
from apps.settings_admin.models import NotificationSetting

def create_notification(employee, notification_type, message):
    setting = NotificationSetting.objects.filter(employee=employee, notification_type=notification_type).first()
    channel = setting.channel if setting else 'both'
    
    Notification.objects.create(
        recipient=employee,
        type=notification_type,
        message=message,
        channel=channel
    )
    
    if channel in ['email', 'both']:
        print(f"[EMAIL SIMULATION] To: {employee.user.email} | Subject: EcoSphere Alert - {notification_type} | Body: {message}")
