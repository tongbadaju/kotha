from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserListView, LoginView, RegisterView, CurrentUserView

urlpatterns = [
    path("users/", UserListView.as_view(), name="user-list"),
    path("me/", CurrentUserView.as_view(), name="current-user"),

    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),

    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
