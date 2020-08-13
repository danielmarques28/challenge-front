FROM node:14-alpine

EXPOSE 8080

RUN mkdir code/

ADD . code/

RUN apk add yarn

RUN yarn install

WORKDIR code/

CMD ['yarn', 'start']
