from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import AIModel, PerformanceLog
from .serializers import AIModelSerializer, PerformanceLogSerializer

class AIModelViewSet(viewsets.ModelViewSet):
    queryset = AIModel.objects.all()
    serializer_class = AIModelSerializer
    # Adds search functionality for the model name
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class PerformanceLogViewSet(viewsets.ModelViewSet):
    # Show newest logs first
    queryset = PerformanceLog.objects.all().order_by('-timestamp')
    serializer_class = PerformanceLogSerializer
    
    # Allows filtering by model ID or status (e.g., Success/Error)
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['ai_model', 'status']
    ordering_fields = ['latency_ms', 'timestamp']