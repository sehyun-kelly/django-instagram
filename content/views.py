import os
from uuid import uuid4

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from Instagram.settings import MEDIA_ROOT
from .models import Feed, Reply, Like, Bookmark


# Create your views here.
class Main(APIView):
    def get(self, request):
        feed_object_list = Feed.objects.all().order_by('-created')  # select * from content_feed;
        feed_list = []

        for feed in feed_object_list:
            reply_object_list = Reply.objects.filter(feed_id=feed.id)
            reply_list = []
            for reply in reply_object_list:
                reply_list.append(dict(reply_content=reply.reply_content, user_id=reply.user_id))

            feed_list.append(dict(id=feed.id, content=feed.content, image=feed.image, profile_image=feed.profile_image,
                                  user_id=feed.user_id, like_count=feed.like_count,
                                  created=feed.created, reply_list=reply_list))

        return render(request, "Instagram/main.html", context=dict(feeds=feed_list))


class UploadFeed(APIView):
    def post(self, request):
        file = request.FILES['file']
        uuid_name = uuid4().hex
        save_path = os.path.join(MEDIA_ROOT, uuid_name)

        # saves files
        with open(save_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        image = uuid_name
        content = request.data.get('content')
        user_id = request.data.get('user_id')
        profile_img = request.data.get('profile_img')

        Feed.objects.create(image=image, content=content, user_id=user_id, profile_image=profile_img, like_count=0)

        return Response(status=200)


class UploadReply(APIView):
    def post(self, request):
        feed_id = request.data.get('feed_id', None)
        reply_content = request.data.get('reply_content', None)
        user_id = 'sehyun_kelly'

        Reply.objects.create(feed_id=feed_id, reply_content=reply_content, user_id=user_id)

        return Response(status=200)


class ToggleLike(APIView):
    def post(self, request):
        feed_id = request.data.get('feed_id', None)