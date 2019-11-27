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
]

a = ["shingeki-no-kyojin-chapter-" + str(i) for i in range(1, 124)]
b = ["Shingeki no Kyojin – Chapter " + str(i) for i in range(1, 124)]
manga_list = dict(zip(a, b))

context = {
    'all_components': all_components,
}


def index(request):
    if request.method == 'POST':
        password = request.POST['password']
        if password == "letmein":
            messages.success(request, 'correct password')
            return render(request, 'protectpage.html', context)
        else:
            messages.error(request, 'wrong password')
            return render(request, 'pages/index.html', context)
    else:
        return render(request, 'pages/index.html', context)


def card(request):
    return render(request, 'pages/card.html', context)


def carousel(request):
    album1 = [str(i) for i in list(range(1, 4))]
    album2 = [str(i) for i in list(range(1, 8))]
    this_context = {
        'all_components': all_components,
        'album1': album1,
        'album2': album2,
    }
    return render(request, 'pages/carousel.html', this_context)


def sidebar(request):
    return render(request, 'pages/sidebar.html', context)


def collapse(request):
    return render(request, 'pages/collapse.html', context)


def manga(request):
    numbers = [str(i) for i in list(range(1, 47))]
    this_context = {
        'all_components': all_components,
        'numbers': numbers,
        "manga_list": manga_list,
    }

    return render(request, 'pages/manga.html', this_context)


def gallery(request):
    album = [str(i) for i in list(range(1, 15))]
    this_context = {
        'all_components': all_components,
        'album': album,
    }
    return render(request, 'pages/gallery.html', this_context)


def about(request):
    return render(request, 'pages/about.html', context)
