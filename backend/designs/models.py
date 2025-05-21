from django.db import models
from users.models import User

class ClothingType(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)  # head, torso, legs
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ClothingSubtype(models.Model):
    clothing_type = models.ForeignKey(ClothingType, on_delete=models.CASCADE, related_name='subtypes')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.clothing_type.name} - {self.name}"

class Design(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='designs')
    clothing_type = models.ForeignKey(ClothingType, on_delete=models.CASCADE)
    clothing_subtype = models.ForeignKey(ClothingSubtype, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    primary_color = models.CharField(max_length=50)
    fabric_type = models.CharField(max_length=100)
    size = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.user.email}"

class DesignImage(models.Model):
    design = models.ForeignKey(Design, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='design_images/')
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.design.name}"

class DesignElement(models.Model):
    design = models.ForeignKey(Design, on_delete=models.CASCADE, related_name='elements')
    element_type = models.CharField(max_length=50)  # text, shape, image, etc.
    content = models.JSONField()  # Stores the Excalidraw element data
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Element for {self.design.name}" 