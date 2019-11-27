from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import auth, messages


# Create your views here.

def index(request):
    return render(request, 'p5/p5index.html')
