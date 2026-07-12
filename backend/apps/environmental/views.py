from decimal import Decimal
from django.db.models import Sum, Count, Q, Avg
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import EmissionFactor, ProductESGProfile, EnvironmentalGoal, CarbonTransaction
from .serializers import EmissionFactorSerializer, ProductESGProfileSerializer, EnvironmentalGoalSerializer, CarbonTransactionSerializer

class EmissionFactorViewSet(viewsets.ModelViewSet):
    queryset = EmissionFactor.objects.all()
    serializer_class = EmissionFactorSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['name', 'activity_type']

class ProductESGProfileViewSet(viewsets.ModelViewSet):
    queryset = ProductESGProfile.objects.all()
    serializer_class = ProductESGProfileSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['product_name']

class EnvironmentalGoalViewSet(viewsets.ModelViewSet):
    queryset = EnvironmentalGoal.objects.select_related('department').all()
    serializer_class = EnvironmentalGoalSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['department']

class CarbonTransactionViewSet(viewsets.ModelViewSet):
    queryset = CarbonTransaction.objects.select_related('department', 'emission_factor').all()
    serializer_class = CarbonTransactionSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['department', 'source']
    search_fields = ['department__name']
    ordering_fields = ['date', 'calculated_co2e']

class EnvironmentalDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Health score from dashboard scores (average env score)
        from apps.dashboard.models import DepartmentScore
        env_score = DepartmentScore.objects.aggregate(avg_env=Avg('environmental_score'))['avg_env'] or 0

        # Total footprint
        total_co2e = CarbonTransaction.objects.aggregate(total=Sum('calculated_co2e'))['total'] or 0

        # Breakdown by source
        breakdown = list(
            CarbonTransaction.objects.values('source')
            .annotate(value=Sum('calculated_co2e'))
            .order_by('-value')
        )
        
        # Calculate percentages
        total_val = sum(float(b['value']) for b in breakdown if b['value'])
        for b in breakdown:
            b['value_str'] = f"{float(b['value'] or 0):,.0f} tCO2e"
            b['pct'] = round((float(b['value'] or 0) / total_val * 100)) if total_val > 0 else 0
            b['name'] = b['source'].title()
            
        # Goals progress (top 3)
        goals = list(EnvironmentalGoal.objects.all().order_by('-progress')[:3].values(
            'metric', 'progress', 'target_date'
        ))

        return Response({
            'health_score': round(float(env_score), 1),
            'total_footprint': f"{float(total_co2e):,.0f}",
            'breakdown': breakdown,
            'strategic_goals': [
                {
                    'label': g['metric'],
                    'progress': float(g['progress']),
                    'meta': f"Deadline: {g['target_date']}"
                } for g in goals
            ]
        })

class CarbonTransactionStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total = CarbonTransaction.objects.count()
        total_co2e = CarbonTransaction.objects.aggregate(total=Sum('calculated_co2e'))['total'] or 0
        avg_co2e = float(total_co2e) / total if total > 0 else 0

        return Response({
            'total_transactions': total,
            'total_co2e': f"{float(total_co2e):,.1f}",
            'avg_co2e': f"{avg_co2e:,.1f}"
        })
