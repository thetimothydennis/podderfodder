#!/bin/bash

cd client
npm run-script build
docker rmi capstone-thetimothydennis-api
docker compose build
docker compose up -d