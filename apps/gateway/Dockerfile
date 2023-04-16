FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

EXPOSE 4000

COPY . .

RUN npm run build gateway

CMD ["node", "dist/apps/gateway/main"]