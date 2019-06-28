FROM node:8

RUN npm install -g firebase-tools && firebase --version

RUN set -eux; \
  mkdir /opt/api
WORKDIR /opt/api

CMD ["firebase"]
