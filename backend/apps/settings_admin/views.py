from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Department, Category, ESGConfiguration, FeatureToggle, NotificationSetting
from .serializers import DepartmentSerializer, CategorySerializer, ESGConfigurationSerializer, FeatureToggleSerializer, NotificationSettingSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            from rest_framework.permissions import AllowAny
            return [AllowAny()]
        return super().get_permissions()

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class ESGConfigurationViewSet(viewsets.ModelViewSet):
    queryset = ESGConfiguration.objects.all()
    serializer_class = ESGConfigurationSerializer
    permission_classes = [IsAuthenticated]

class FeatureToggleViewSet(viewsets.ModelViewSet):
    queryset = FeatureToggle.objects.all()
    serializer_class = FeatureToggleSerializer
    permission_classes = [IsAuthenticated]

class NotificationSettingViewSet(viewsets.ModelViewSet):
    queryset = NotificationSetting.objects.all()
    serializer_class = NotificationSettingSerializer
    permission_classes = [IsAuthenticated]
