from django.urls import path
from .views import recognitionModel,testBackend

urlpatterns = [
    path('recognitionModel', recognitionModel.as_view(), name="recognitionModel"),
    path('testBackend', testBackend.as_view(), name="testBackend"),
]

