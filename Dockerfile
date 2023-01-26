FROM node:16-alpine

WORKDIR /personal-blog-web

COPY . .

ENV HOST "0.0.0.0"

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

RUN npm run build

RUN npm cache clean --force

EXPOSE 3000

CMD ["npm","start"]