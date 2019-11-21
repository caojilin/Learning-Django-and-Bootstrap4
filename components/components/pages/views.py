from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def index(request):
    return render(request, 'pages/index.html')


def alert(request):
    return render(request, 'pages/alert.html')


def badge(request):
    return render(request, 'pages/badge.html')


def breadcrumb(request):
    return render(request, 'pages/breadcrumb.html')


def button(request):
    return render(request, 'pages/button.html')


def card(request):
    return render(request, 'pages/card.html')


def carousel(request):
    return render(request, 'pages/carousel.html')


def sidebar(request):
    return render(request, 'pages/sidebar.html')
