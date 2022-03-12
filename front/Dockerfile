FROM node:14-alpine as builder

WORKDIR /front

COPY ./package.json .

RUN yarn install

COPY ./ ./

EXPOSE 3000

CMD ["yarn", "dev"]
