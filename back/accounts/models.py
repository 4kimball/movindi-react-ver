from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    sns_id = models.CharField(max_length=100, blank=False)
    sns_type = models.CharField(max_length=100, blank=False)
    image = ProcessedImageField(upload_to='image/profile_image', processors=[ResizeToFill(480, 640)], format='JPEG', options={'quality':150}, blank=True )
