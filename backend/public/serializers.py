from rest_framework import serializers
from .models import TeamMember, SocialLink

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['icon_class', 'link']

class TeamMemberSerializer(serializers.ModelSerializer):
    socials = SocialLinkSerializer(many=True, read_only=True)

    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'image', 'socials']
