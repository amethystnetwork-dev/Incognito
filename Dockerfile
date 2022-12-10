FROM node:18-slim

WORKDIR /app

COPY ./package.json ./package-lock.json ./static/ ./src/ ./ssl/

RUN npm install

ENTRYPOINT npm start