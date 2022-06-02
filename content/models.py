from django.db import models

# Create your models here.
class Feed(models.Model):
    content = models.TextField()
    image = models.TextField()
    profile_image = models.TextField()
    user_id = models.TextField()
    like_count = models.TextField()
    created = models.DateTimeField(auto_now_add=True)


class Like(models.Model):
    feed_id = models.IntegerField(default=0)
    user_id = models.TextField()
    is_like = models.BooleanField(default=True)


class Reply(models.Model):
    feed_id = models.IntegerField(default=0)
    user_id = models.TextField()
    reply_content = models.TextField()


class Bookmark(models.Model):
    feed_id = models.IntegerField(default=0)
    user_id = models.TextField()
    is_marked = models.BooleanField(default=True)