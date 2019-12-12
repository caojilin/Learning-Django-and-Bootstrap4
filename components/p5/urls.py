from django.urls import path
from . import views

urlpatterns = [
    path('p5index', views.index, name='p5index'),
]
