FROM node:20-alpine

WORKDIR /api

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 3310

CMD [ "npm", "run", "dev" ]