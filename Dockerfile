FROM node:14-alpine as builder

WORKDIR /app

COPY ./front ./

RUN yarn install

EXPOSE 3030

CMD ["cd", "./front"]
CMD ["yarn", "dev"]
