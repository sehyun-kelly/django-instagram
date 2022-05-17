from django.shortcuts import render
from rest_framework.views import APIView


class Sub(APIView):
    def get(self, request):
        print("called by get")
        return render(request, "Instagram/main.html")

    def post(self, request):
        print("called by post")
        return render(request, "Instagram/main.html")