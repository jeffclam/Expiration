FROM node:14.5.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY server/package*.json ./

RUN npm install

COPY ./server ./

CMD ["node", "server.js"]