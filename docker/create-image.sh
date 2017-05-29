#!/usr/bin/env bash

docker build -t phiroict/node:$(date +%Y%m%d) .
docker push phiroict/node:$(date +%Y%m%d)