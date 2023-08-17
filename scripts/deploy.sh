#!/bin/bash

docker rmi capstone-thetimothydennis-api
docker compose build
docker compose up -d