from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('grid', views.grid, name="grid"),
    path('badge', views.badge, name="badge"),
    path('breadcrumb', views.breadcrumb, name="breadcrumb"),
    path('button', views.button, name='button'),
    path('car', views.card, name='card'),
    path('carousel', views.carousel, name='carousel'),
    path('sidebar', views.sidebar, name='sidebar'),
    path('collapse', views.collapse, name='collapse'),
    path('forms', views.forms, name='forms'),
    path('login', views.login, name='login'),
    path('modal', views.modal, name='modal'),
    path('manga', views.manga, name='manga'),
]
