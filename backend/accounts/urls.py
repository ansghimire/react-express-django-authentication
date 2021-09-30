from django.urls import path
from .views import RegisterCreateAPIView, ProfileCreateAPIView

#api/register/
urlpatterns = [
    path('register/', RegisterCreateAPIView.as_view(), name="register"),
    path('profile/', ProfileCreateAPIView.as_view(), name="profile")
]