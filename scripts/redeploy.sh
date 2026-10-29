#!/bin/bash

docker compose down
docker rmi podderfodder-api
docker compose build
docker compose up -d