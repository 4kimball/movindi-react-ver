from django.db import models
from django.conf import settings
from django.db import models 
from django.core.validators import MinValueValidator, MaxValueValidator
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    scrap_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='scrap_review')

class Movie(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    director = models.CharField(max_length=50)
    actors = models.TextField()
    poster_path = models.TextField()
    release_date = models.TextField()
    genre = models.CharField(max_length=50)
    keyword = models.CharField(max_length=50)
    rank_average = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')

class ReviewComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)

class MovieComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rank = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    content = models.CharField(max_length=200)

class Actor(models.Model):
    name = models.CharField(max_length=20)
    intro = models.TextField()
    date_of_birth = models.TextField()
    filmography = models.TextField()
    profile_image = models.TextField()
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_actors')
    