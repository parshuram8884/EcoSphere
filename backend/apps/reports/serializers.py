from rest_framework import serializers
from .models import ReportRequest

class ReportRequestSerializer(serializers.ModelSerializer):
    generated_by_name = serializers.SerializerMethodField()

    class Meta:
        model = ReportRequest
        fields = ['id', 'filters_snapshot', 'format', 'generated_by', 'generated_by_name', 'generated_at', 'file']
        read_only_fields = ['generated_at', 'file', 'generated_by']

    def get_generated_by_name(self, obj):
        if obj.generated_by:
            return obj.generated_by.user.get_full_name() or obj.generated_by.user.username
        return "System"
