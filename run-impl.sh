#!/usr/bin/env bash

docker rm -f node-impl-demo

docker run -d -p 3000:3000 --name node-impl-demo solnet/node-impl:20170528