from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from HoundExpress.models import Guide
from .serializers import GuideSerializer
from django.shortcuts import get_object_or_404

class GuideViewSet(viewsets.ViewSet):
    
    def create(self, request):
        serializer = GuideSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        guide = get_object_or_404(Guide, pk=pk)
        serializer = GuideSerializer(guide)
        return Response(serializer.data)

    def update(self, request, pk=None):
        guide = get_object_or_404(Guide, pk=pk)
        serializer = GuideSerializer(guide, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        guide = get_object_or_404(Guide, pk=pk)
        guide.delete()
        return Response(status=204)