from rest_framework import serializers
from .models import AIModel, PerformanceLog

class AIModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIModel
        fields = '__all__'

class PerformanceLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceLog
        fields = '__all__'