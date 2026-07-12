from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportRequestViewSet, ReportGenerateView

router = DefaultRouter()
router.register(r'requests', ReportRequestViewSet)

urlpatterns = [
    path('generate/', ReportGenerateView.as_view(), name='report-generate'),
    path('', include(router.urls)),
]
