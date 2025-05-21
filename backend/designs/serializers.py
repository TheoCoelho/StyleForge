from rest_framework import serializers
from .models import Design, ClothingType, ClothingSubtype, DesignImage, DesignElement

class ClothingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingType
        fields = '__all__'

class ClothingSubtypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingSubtype
        fields = '__all__'

class DesignImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignImage
        fields = '__all__'

class DesignElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignElement
        fields = '__all__'

class DesignSerializer(serializers.ModelSerializer):
    images = DesignImageSerializer(many=True, read_only=True)
    elements = DesignElementSerializer(many=True, read_only=True)
    clothing_type = ClothingTypeSerializer(read_only=True)
    clothing_subtype = ClothingSubtypeSerializer(read_only=True)

    class Meta:
        model = Design
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')

    def create(self, validated_data):
        clothing_type_id = self.context['request'].data.get('clothing_type')
        clothing_subtype_id = self.context['request'].data.get('clothing_subtype')
        
        validated_data['clothing_type'] = ClothingType.objects.get(id=clothing_type_id)
        validated_data['clothing_subtype'] = ClothingSubtype.objects.get(id=clothing_subtype_id)
        
        return super().create(validated_data) 