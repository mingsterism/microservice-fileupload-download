#!/bin/bash
imageName=mingsterism/file-microservice:api
containerName=file-microservice

echo Run new container...
docker run -p 3001:3001 \
--env-file ./.secret_env \
--name $containerName $imageName 
