#!/bin/bash

npm run-script build --workspace=client
docker rmi capstone-thetimothydennis-api
docker compose build
docker compose up -d