from rest_framework import viewsets, status
from .models import Property
from .serializers import PropertySerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
        
    @action(detail=True, methods=['patch'], url_path='toggle-availability')
    def toggle_availability(self, request, pk=None):
        property = self.get_object()
        property.is_available = not property.is_available
        property.save()
        return Response({'is_available': property.is_available}, status=status.HTTP_200_OK)
