FROM node

WORKDIR /usr/app
COPY ./ /usr/app

ENV DATABASE_URL=

RUN npm install
CMD npm start