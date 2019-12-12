from django.urls import path
from . import views

urlpatterns = [
    path('p5index', views.index, name='p5index'),
    path('unicorn', views.unicorn, name='unicorn'),
    path('game_2048', views.game_2048, name='game_2048'),
    path('tic_tac_toe', views.tic_tac_toe, name='tic_tac_toe'),
]
