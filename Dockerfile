FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .

RUN npm install

COPY static static/
COPY src/*.js src/

EXPOSE 8080

CMD ["npm", "start"]