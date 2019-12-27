from django.urls import path
from . import views

urlpatterns = [
    path('p5index', views.index, name='p5index'),
    path('t_rex', views.t_rex, name='t_rex'),
    path('game_2048', views.game_2048, name='game_2048'),
    path('tic_tac_toe', views.tic_tac_toe, name='tic_tac_toe'),
    path('maze', views.maze, name='maze'),
    path('flappy_bird', views.flappy_bird, name='flappy_bird'),
    path('angry_bird', views.angry_bird, name='angry_bird'),
]
