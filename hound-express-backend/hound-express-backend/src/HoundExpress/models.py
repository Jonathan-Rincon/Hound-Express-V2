from django.db import models
from django.db.models import IntegerField
from django.utils import timezone

# Create your models here.
class Guide(models.Model):
    
    id = IntegerField(primary_key=True) # Identificador único de la guía.
    trackingNumber = models.CharField(max_length=15, unique=True) # Número de rastreo único del paquete.
    origin = models.CharField(max_length=100) # Dirección de origen del paquete.
    destination = models.CharField(max_length=100) # Dirección de destino del paquete.
    createdAt = models.DateField(default=timezone.now) # Fecha y hora de creación de la guía.
    updatedAt = models.DateTimeField(auto_now=True) # Fecha y hora de la última actualización de la guía.
    currentStatus = models.CharField(max_length=20) # Estado actual del paquete.

class StatusHistory(models.Model):

    id = IntegerField(primary_key=True) # Identificador único del historial de estado.
    guideId = models.ForeignKey(Guide, on_delete=models.CASCADE) # Llave foránea que referencia la entidad Guide.
    updatedBy = models.CharField(max_length=20) # Nombre o ID del usuario que
    status = models.CharField(max_length=20) # Estado del paquete en el momento del registro.
    timestamp = models.DateTimeField(default=timezone.now) # Fecha y hora del registro del estado.

class User(models.Model):
    
    id = IntegerField(primary_key=True) # Identificador único del Usuario.
    name = models.CharField(max_length=50) # Nombre completo del Usuario
    email = models.CharField(max_length=50) # Correo electrónico del Usuario
    password = models.CharField(max_length=20) # Contraseña encriptada del Usuario
    createdAt = models.DateField(default=timezone.now) # Fecha y hora de creación del historial de estado.
    updatedAt = models.DateTimeField(auto_now=True)
 # Fecha

