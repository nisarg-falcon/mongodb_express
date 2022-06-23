FROM node:16.15.1-alpine

RUN mkdir -p /var/app/src

WORKDIR /var/app

COPY ./package.json package.json

RUN npm install

WORKDIR /var/app/src

COPY ./src .

CMD npm start

EXPOSE 3000