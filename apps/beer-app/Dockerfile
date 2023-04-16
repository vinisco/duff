FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

RUN npm run build beer-app

CMD ["node", "dist/apps/beer-app/main"]