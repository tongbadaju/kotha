from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import update_last_login

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "phone_number", "role", "last_login"]
""" 
class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "phone_number"] 
        read_only_fields = ["id", "name", "phone_number",]
 """
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "phone_number", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # SimpleJWT uses phone_number instead of username
    username_field = "phone_number"

    def validate(self, attrs):
        data = super().validate(attrs)

        # Update last_login timestamp
        user = self.user
        update_last_login(None, user)

        return data