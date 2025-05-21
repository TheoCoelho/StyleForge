from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Design, ClothingType, ClothingSubtype, DesignImage, DesignElement
from .serializers import (
    DesignSerializer,
    ClothingTypeSerializer,
    ClothingSubtypeSerializer,
    DesignImageSerializer,
    DesignElementSerializer,
)

class DesignListCreateAPI(generics.ListCreateAPIView):
    serializer_class = DesignSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Design.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DesignRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DesignSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Design.objects.filter(user=self.request.user)

class ClothingTypeListAPI(generics.ListAPIView):
    queryset = ClothingType.objects.all()
    serializer_class = ClothingTypeSerializer
    permission_classes = [permissions.IsAuthenticated]

class ClothingSubtypeListAPI(generics.ListAPIView):
    queryset = ClothingSubtype.objects.all()
    serializer_class = ClothingSubtypeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = ClothingSubtype.objects.all()
        clothing_type = self.request.query_params.get('type', None)
        if clothing_type is not None:
            queryset = queryset.filter(clothing_type_id=clothing_type)
        return queryset

class DesignImageListCreateAPI(generics.ListCreateAPIView):
    serializer_class = DesignImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DesignImage.objects.filter(design__user=self.request.user)

    def perform_create(self, serializer):
        design_id = self.request.data.get('design')
        design = Design.objects.get(id=design_id, user=self.request.user)
        serializer.save(design=design)

class DesignImageRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DesignImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DesignImage.objects.filter(design__user=self.request.user)

class DesignElementListCreateAPI(generics.ListCreateAPIView):
    serializer_class = DesignElementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DesignElement.objects.filter(design__user=self.request.user)

    def perform_create(self, serializer):
        design_id = self.request.data.get('design')
        design = Design.objects.get(id=design_id, user=self.request.user)
        serializer.save(design=design)

class DesignElementRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DesignElementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DesignElement.objects.filter(design__user=self.request.user) 