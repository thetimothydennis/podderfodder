#!/bin/bash

docker rmi podderfodder-api
docker compose build
docker compose up -d