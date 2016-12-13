FROM node:7.2.1

MAINTAINER Mikhail Faraponov

RUN mkdir /app

WORKDIR /app

COPY package.json /app/

RUN npm install --no-optional

RUN npm install webpack -g --no-optional

COPY . /app

CMD [ "webpack" ]
