# Creating multi-stage build for production
FROM node:18.20.5-alpine AS build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
ENV NODE_ENV=production

RUN corepack enable && corepack prepare yarn@4.5.3 --activate

WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install

RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]
