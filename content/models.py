from django.db import models

# Create your models here.
class Feed(models.Model):
    content = models.TextField()
    image = models.TextField()
    profile_image = models.TextField()
    user_id = models.TextField()
    like_count = models.TextField()
    created = models.DateTimeField(auto_now_add=True)