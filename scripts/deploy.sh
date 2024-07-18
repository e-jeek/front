#!/bin/bash
cd /home/ubuntu
sudo docker build -t docker-test -f ./action/Dockerfile .
sudo docker run -i --rm -p 3000:3000 docker-test