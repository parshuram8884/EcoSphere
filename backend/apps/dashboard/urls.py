from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartmentScoreViewSet

router = DefaultRouter()
router.register(r'scores', DepartmentScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
