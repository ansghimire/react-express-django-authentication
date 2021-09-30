from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import UserSerializer
from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated


class RegisterCreateAPIView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = UserSerializer.Meta.model.objects.all()


class ProfileCreateAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = UserSerializer.Meta.model.objects.all()







