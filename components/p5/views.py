from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import auth, messages


# Create your views here.

def index(request):
    return render(request, 'p5/p5index.html')


def t_rex(request):
    return render(request, 'p5/t_rex.html')


def game_2048(request):
    return render(request, 'p5/game_2048.html')


def tic_tac_toe(request):
    return render(request, 'p5/tic_tac_toe.html')


def maze(request):
    return render(request, 'p5/maze.html')


def flappy_bird(request):
    return render(request, 'p5/flappy_bird.html')

def angry_bird(request):
    return render(request, 'p5/angry_bird.html')
