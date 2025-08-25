import os
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

def property_image_upload_path(instance, filename):
    # Store inside media/property_images/<property_id>/<filename>
    return os.path.join("property_images", str(instance.property.id), filename)

class Property(models.Model):
    PROPERTY_TYPES = [
        ("room", "Room"),
        ("flat", "Flat"),
        ("paying_guest", "Paying Guest"),
        ("house", "House"),
        ("office", "Office"),
        ("hostel", "Hostel"),
        ("shop", "Shop"),
        ("other", "Other"),
    ]

    DISTRICTS = [
        ("Gangtok", "Gangtok"),
        ("Mangan", "Mangan"),
        ("Namchi", "Namchi"),
        ("Gyalshing", "Gyalshing"),
        ("Pakyong", "Pakyong"),
        ("Soreng", "Soreng"),
    ]

    GENDER_PREFERENCE = [
        ("boys", "Boys"),
        ("girls", "Girls"),
        ("unisex", "Unisex"),
    ]

    title = models.CharField(max_length=200, help_text="Short name or title for the property")
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    description = models.TextField(blank=True, null=True)

    # Location fields
    district = models.CharField(max_length=50, choices=DISTRICTS)
    area = models.CharField(max_length=100)
    address = models.CharField(max_length=255)

    # Details
    bedrooms = models.PositiveIntegerField(default=0)
    bathrooms = models.PositiveIntegerField(default=0)
    kitchen = models.PositiveIntegerField(default=0)

    # Pricing
    price = models.DecimalField(max_digits=12, decimal_places=2)
    available_from = models.DateField(blank=True, null=True)

    gender_preference = models.CharField(max_length=10, choices=GENDER_PREFERENCE, default="unisex")
    
    is_available = models.BooleanField(default=True)

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='uploaded_properties',
        help_text="User who uploaded this property"
    )

    # Meta
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_property_type_display()})"
    
    class Meta:
        db_table = 'property'


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=property_image_upload_path)

    def __str__(self):
        return f"Image for {self.property.title}"
    
    class Meta:
        db_table = 'property_image'