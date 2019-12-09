from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('card', views.card, name='card'),
    path('carousel', views.carousel, name='carousel'),
    path('sidebar', views.sidebar, name='sidebar'),
    path('collapse', views.collapse, name='collapse'),
    path('manga', views.manga, name='manga'),
    path('gallery', views.gallery, name='gallery'),
    path('about', views.about, name='about'),
    path('article', views.article, name='article'),
]
