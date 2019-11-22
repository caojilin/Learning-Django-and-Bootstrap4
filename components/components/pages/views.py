from django.shortcuts import render, redirect
from django.http import HttpResponse
from .all_pages import all_components
from django.contrib import auth, messages
# Create your views here.

context = {
    'all_components': all_components,
}


def index(request):

    return render(request, 'pages/index.html', context)


def grid(request):

    return render(request, 'pages/grid.html', context)


def badge(request):
    return render(request, 'pages/badge.html', context)


def breadcrumb(request):
    return render(request, 'pages/breadcrumb.html', context)


def button(request):
    return render(request, 'pages/button.html', context)


def card(request):
    return render(request, 'pages/card.html', context)


def carousel(request):
    return render(request, 'pages/carousel.html', context)


def sidebar(request):
    return render(request, 'pages/sidebar.html', context)


def collapse(request):
    return render(request, 'pages/collapse.html', context)


def forms(request):
    return render(request, 'pages/forms.html', context)


def login(request):
    return render(request, 'pages/login.html', context)


def modal(request):
    return render(request, 'pages/modal.html', context)