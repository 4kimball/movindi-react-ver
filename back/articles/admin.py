from django.contrib import admin
from .models import Review, ReviewComment, Movie, MovieComment, Actor

admin.site.register(Review)
admin.site.register(ReviewComment)
admin.site.register(Movie)
admin.site.register(MovieComment)
admin.site.register(Actor)
