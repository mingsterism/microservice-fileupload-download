#!/bin/bash
imageName=mingsterism/file-microservice:api
containerName=file-microservice

echo Run new container...
docker run -p 8080:4000 \
--env-file ./.secret_env \
--name $containerName $imageName 
