#!/bin/bash

npm run build --workspace=client --package-lock-only=true
docker compose down
docker rmi capstone-thetimothydennis-api
docker compose build
docker compose up -d