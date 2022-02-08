from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'pk', 'image', 'sns_id', 'sns_type', 'password', 'like_actors', 'like_movies', 'review_set', 'scrap_review')
        read_only_fields = ('image', 'like_actors', 'like_movies', 'review_set', 'scrap_review')
