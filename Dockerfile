FROM node:12-stretch
WORKDIR /usr/app
COPY . /usr/app

RUN npm ci \
    && npm run lint \
    && npm run build

FROM microparts/static-server-php:1.2.0

COPY --from=0 /usr/app/dist /app
COPY --from=0 /usr/app/configuration /app/configuration

ENV STAGE prod
