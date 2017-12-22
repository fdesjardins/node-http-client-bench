FROM node:9.3.0-alpine

RUN apk update && apk upgrade

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .
CMD [ "node", "index.js" ]
