#!/bin/bash
cd /home/ubuntu/action
sudo docker build -t docker-test -f ./Dockerfile .
sudo docker run -i --rm -p 3000:3000 docker-test