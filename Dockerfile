FROM node:11-stretch
WORKDIR /usr/app
COPY . /usr/app

ARG STAGE

RUN npm ci \
    && npm run lint \
    && npm run build

FROM microparts/static-server-php:1.1.4

COPY --from=0 /usr/app/dist /app
COPY --from=0 /usr/app/configuration /app/configuration

ARG VCS_SHA1
ARG STAGE
ENV STAGE $STAGE
ENV VCS_SHA1 $VCS_SHA1
