#!/bin/sh

# init project
docker-compose run api firebase login --no-localhost
docker-compose run api firebase init functions

# update
docker-compose run --workdir=/opt/api/functions api \
  npm install firebase-functions@latest firebase-admin@latest --save
docker-compose run --user=root --workdir=/opt/api/functions api \
  npm install -g firebase-tools

# remove temp image
docker-compose rm --force
