from django.contrib import admin

from .models import Album


class AlbumAdmin(admin.ModelAdmin):
    list_display = ('image', 'list_date')
    list_display_links = ('image', 'list_date')
    search_fields = ('image', )
    list_per_page = 25


admin.site.register(Album, AlbumAdmin)
