from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'type', 'message', 'is_read', 'created_at')
    list_filter = ('type', 'is_read')
    list_editable = ('is_read',)
    raw_id_fields = ('recipient',)
from django.contrib import admin

# Register your models here.
