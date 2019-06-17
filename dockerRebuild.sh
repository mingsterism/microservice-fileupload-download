#!/bin/bash
imageName=mingsterism/file-microservice:api
containerName=file-microservice

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker container rm -f $containerName

echo Run new container...
docker run -p 3001:3001 \
--env-file ./.secret_env \
--name $containerName $imageName 
# -e "URL=mongodb+srv://tintinthong:H-i5JBrKh-Xp3%21-@cluster0-duqpt.mongodb.net/test?retryWrites=true" -e "PORT=3000" \