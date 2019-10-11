FROM node:lts-slim

WORKDIR /app

COPY . /app
COPY ./package.json .

RUN npm install

EXPOSE 3001

CMD ["node", "index.js"]
