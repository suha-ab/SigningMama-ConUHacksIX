from django.urls import path
from .views import recognitionModel

urlpatterns = [
    path('recognitionModel', recognitionModel.as_view(), name="recognitionModel"),
]

