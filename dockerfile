FROM node:11.10.0-alpine

RUN apk update && apk upgrade

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .
