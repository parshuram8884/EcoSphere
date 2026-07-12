from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartmentViewSet, CategoryViewSet, ESGConfigurationViewSet, FeatureToggleViewSet, NotificationSettingViewSet

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'esg-configurations', ESGConfigurationViewSet)
router.register(r'feature-toggles', FeatureToggleViewSet)
router.register(r'notification-settings', NotificationSettingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
