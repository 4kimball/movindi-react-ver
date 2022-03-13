FROM node:14-alpine as builder

WORKDIR /front

COPY ./front/package-lock.json .
COPY ./front/package.json .

RUN yarn install

COPY ./ ./

EXPOSE 3000

CMD ["cd", "./front"]
CMD ["yarn", "dev"]
