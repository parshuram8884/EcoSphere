from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ReportRequest
from .serializers import ReportRequestSerializer

class ReportRequestViewSet(viewsets.ModelViewSet):
    queryset = ReportRequest.objects.select_related('generated_by__user').all()
    serializer_class = ReportRequestSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['report_type', 'generated_by']

class ReportGenerateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        report_type = request.data.get('type', 'custom')
        format = request.data.get('format', 'pdf')
        filters = request.data.get('filters', {})
        
        # Simulate report generation
        employee = getattr(request.user, 'employee', None)
        if not employee:
            return Response({'detail': 'User is not an employee.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create record
        report = ReportRequest.objects.create(
            report_type=report_type,
            parameters=filters,
            generated_by=employee,
            file_url=f"/media/reports/mock_{report_type}_{format}.{format}"
        )

        return Response({
            'status': 'Report generated successfully',
            'download_url': report.file_url,
            'id': report.id
        })
