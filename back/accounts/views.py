from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED
)

from .serializers import (
    UserSerializer
)

from django.contrib.auth import get_user_model
import jwt

from accounts import serializers

@api_view(['POST'])
def signup(request):
    # 1. 비밀번호 준비
    password = request.data.get('password')
    password_confirmation = request.data.get('passwordConfirmation')

    # 2. 비밀번호 일치 확인
    if password != password_confirmation:
        return Response({ 'error': '비밀번호가 일치하지 않습니다.' }, HTTP_400_BAD_REQUEST)
    
    # 3. 인스턴스 준비
    serializer = UserSerializer(data=request.data)
    print(request.data)
    
    # 4. 유효성 검사
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        # 5. 비밀번호 해싱
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, HTTP_201_CREATED)

@api_view(['GET'])
def getByUsername(request, username):
    User = get_user_model()
    user = get_object_or_404(User, username=username)
    
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def update_user_info(request):
    access_token = request.data.get('access_token')
    user = jwt.decode(f'{access_token}', None, None)
    user_id = user.get('user_id')
    User = get_user_model()
    user = User.objects.get(pk=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)