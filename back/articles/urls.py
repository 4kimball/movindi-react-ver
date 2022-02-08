from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.movie_list),
    path('movies/<str:keyword>/', views.movie_keyword),
    path('community/<str:type>/', views.community_list_create),
    path('community/detail/<int:article_pk>/', views.article_detail),
    path('community/detail/<int:article_pk>/scrap/', views.article_scrap),
    path('community/article/<int:article_pk>/', views.article_update_delete),
    path('community/article/<int:review_pk>/comments/', views.review_comment_create),
    path('community/article/comments/<int:comment_pk>/', views.review_comment_delete),
    path('movies/<int:movie_pk>/comments/', views.movie_comment_create),
    path('movies/comments/<int:comment_pk>/', views.movie_comment_delete),
    path('movies/detail/<int:movie_pk>/', views.movie_detail),
    path('movies/detail/like/<int:movie_pk>/', views.like_movie),
    path('actors/page/all/', views.actor_list),
    path('actors/page=<int:page>/', views.actor_list_scroll),
    path('search/', views.search),
    path('actors/like/<int:actor_pk>/', views.like_actor),
]
