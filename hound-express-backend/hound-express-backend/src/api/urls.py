from django.urls import path
from .views import GuideViewSet


urlpatterns = [
    path('crear-guia/', GuideViewSet.as_view({'post': 'create'}), name='crear-guia'),
    path('actualizar-guia/<int:pk>/', GuideViewSet.as_view({'put': 'update'}), name='actualizar-guia'),
    path('obtener-guia/<int:pk>/', GuideViewSet.as_view({'get': 'retrieve'}), name='obtener-guia'),
    path('eliminar-guia/<int:pk>/', GuideViewSet.as_view({'delete': 'destroy'}), name='eliminar-guia'),
]