from django import forms
from .models import Album


class UploadFileForm(forms.ModelForm):
    class Meta:
        model = Album
        fields = ['image', 'list_date']
