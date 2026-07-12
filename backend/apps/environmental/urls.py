from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmissionFactorViewSet, ProductESGProfileViewSet, EnvironmentalGoalViewSet, CarbonTransactionViewSet

router = DefaultRouter()
router.register(r'emission-factors', EmissionFactorViewSet)
router.register(r'product-esg-profiles', ProductESGProfileViewSet)
router.register(r'goals', EnvironmentalGoalViewSet)
router.register(r'carbon-transactions', CarbonTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
