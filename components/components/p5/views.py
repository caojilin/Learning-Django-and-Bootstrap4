from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import auth, messages

# Create your views here.
all_components = [
    'card',
    'carousel',
    'collapse',
    'manga',
    'gallery',
    'article',
]
context = {
    'all_components': all_components,
}


def index(request):
    return render(request, 'p5/p5index.html', context)
