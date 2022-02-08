from django.shortcuts import get_list_or_404, get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Review, ReviewComment, Movie, MovieComment, Actor
from .serializers import (
    MovieSerializer,
    ReviewCommentSerializer,
    ReviewListSerializer,
    MovieListSerializer,
    MovieCommentSerializer,
    ReviewSerializer,
    ActorListSerializer
)
from django.contrib.auth import get_user_model
import jwt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie_list(request):
    '''
    전체 영화 목록 가져오기
    '''
    movies = get_list_or_404(Movie)
    for i in range(len(movies)):
        movie = get_object_or_404(Movie, pk=movies[i].pk)
        comments = movie.moviecomment_set.all()
        total = 0
        for j in range(len(comments)):
            total += comments[j].rank
        if len(comments) > 0:
            rank_average = total // len(comments)
            Movie.objects.filter(pk=movies[i].pk).update(rank_average=rank_average)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie_keyword(request, keyword):
    '''
    키워드로 영화추천하기
    '''
    movies = Movie.objects.filter(keyword=keyword).order_by('?')[:4]
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def community_list_create(request, type):
    '''
    type이 review, casting, free에 따라 글의 목록 읽고 쓰기
    '''
    print(type)
    if request.method == 'GET':
        if type == 'all':
            articles = Review.objects.order_by('pk')
        else:
            articles = Review.objects.filter(type=type).order_by('pk')
        serializer = ReviewListSerializer(articles, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':    
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def article_detail(request, article_pk):
    '''
    해당 글 선택시 해당 글로 이동하기
    '''
    article = get_object_or_404(Review, pk=article_pk)
    if request.method == 'GET':
        serializer = ReviewListSerializer(article)
        
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def article_update_delete(request, article_pk):
    article = get_object_or_404(Review, pk=article_pk)
    if request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = ReviewSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_comment_create(request, review_pk):
    '''
    게시글에 대한 댓글 쓰기
    '''
    review = get_object_or_404(Review, pk=review_pk)
    
    if request.method == 'POST':
        serializer = ReviewCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(review=review, user=request.user)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def review_comment_delete(request, comment_pk):
    comment = get_object_or_404(ReviewComment, pk=comment_pk)
    comment.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    comments = movie.moviecomment_set.all()
    total = 0
    count = 0
    print(comments.values_list())
    for value in comments.values_list():
        rank = value[3]
        total += rank
        count += 1

    if count > 0:
        rank_average = total // count
        movie.rank_average = rank_average
    
    movie.save()
    print(movie.rank_average)
    serializer = MovieListSerializer(movie)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def movie_comment_create(request, movie_pk):
    '''
    영화에 평점 및 댓글 달기
    '''
    movie = get_object_or_404(Movie, pk=movie_pk)
    request.data['rank'] = int(request.data['rank'])
    movie.rank_average += request.data['rank']
    print(request.data)
    serializer = MovieCommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def movie_comment_delete(request, comment_pk):
    comment = get_object_or_404(MovieComment, pk=comment_pk)
    comment.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def actor_list(request):
    '''
    전체 배우 리스트
    '''
    actors = get_list_or_404(Actor)
    serializer = ActorListSerializer(actors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def actor_list_scroll(request, page):
    '''
    무한 스크롤 -> actors에 보여질 데이터
    '''
    start = 6 * (page-1)
    end = 6 * page
    actors = get_list_or_404(Actor)[start:end]
    serializer = ActorListSerializer(actors, many=True)
    return Response(serializer.data)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search(request):
    '''
    검색
    '''
    keyword = request.data.get('keyword')
    if Actor.objects.filter(name__contains=keyword).exists():
        actor = Actor.objects.get(name__contains=keyword)
        serializer = ActorListSerializer(actor)
        return Response(serializer.data)
    elif Movie.objects.filter(title__contains=keyword).exists():
        movie = Movie.objects.get(title__icontains=keyword)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_actor(request, actor_pk):
    access_token = request.data.get('access_token')
    user = jwt.decode(f'{access_token}', None, None)
    actor = get_object_or_404(Actor, pk=actor_pk)
    user_id = user.get('user_id')
    User = get_user_model()
    user = User.objects.get(pk=user_id)
    
    if actor.like_users.filter(pk=user.pk).exists():
        actor.like_users.remove(user)
    else:
        actor.like_users.add(user)
    
    actors = get_list_or_404(Actor)
    serializer = ActorListSerializer(actors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_movie(request, movie_pk):
    access_token = request.data.get('access_token')
    user = jwt.decode(f'{access_token}', None, None)
    movie = get_object_or_404(Movie, pk=movie_pk)
    user_id = user.get('user_id')
    User = get_user_model()
    user = User.objects.get(pk=user_id)
    
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
    else:
        movie.like_users.add(user)
    
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def article_scrap(request, article_pk):
    access_token = request.data.get('access_token')
    user = jwt.decode(f'{access_token}', None, None)
    article = get_object_or_404(Review, pk=article_pk)
    user_id = user.get('user_id')
    User = get_user_model()
    user = User.objects.get(pk=user_id)

    if article.scrap_users.filter(pk=user.pk).exists():
        article.scrap_users.remove(user)
    else:
        article.scrap_users.add(user)
    
    article = get_object_or_404(Review, pk=article_pk)
    serializer = ReviewListSerializer(article)
    return Response(serializer.data)
