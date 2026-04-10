from django.db import models

class AIModel(models.Model):
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class PerformanceLog(models.Model):
    ai_model = models.ForeignKey(AIModel, on_delete=models.CASCADE)
    latency_ms = models.FloatField()
    status = models.CharField(max_length=20, default="Success")
    timestamp = models.DateTimeField(auto_now_add=True)