FROM node:14.5.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY webapp/package*.json ./

RUN npm install

COPY ./webapp ./

CMD ["npm", "start"]
# CMD tail -f /dev/null