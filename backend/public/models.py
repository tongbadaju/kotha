import os
from django.db import models

def team_member_image_upload_path(filename):
    # Store inside media/team_members/<filename>
    return os.path.join("team_members", filename)

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to=team_member_image_upload_path, blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'public_team_member'

class SocialLink(models.Model):
    member = models.ForeignKey(TeamMember, related_name='socials', on_delete=models.CASCADE)
    icon_class = models.CharField(max_length=100) 
    link = models.URLField()

    def __str__(self):
        return f"{self.member.name} - {self.icon_class}"
    
    class Meta:
        db_table = 'public_social_link'
