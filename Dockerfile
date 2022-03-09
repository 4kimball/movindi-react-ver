FROM node:14-alpine as builder

WORKDIR /front

COPY ./front/package.json .
COPY ./front/package-lock.json .

RUN yarn install

COPY ./front ./

EXPOSE 3000

CMD ["yarn", 'dev']