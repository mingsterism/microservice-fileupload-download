FROM node:lts-slim

ENV DBATLAS_USER=DBATLAS_USER
ENV DBATLAS_PW=DBATLAS_PW

# Create app directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /app
COPY . /usr/src/app

# Bundle app source
COPY ./package.json .

# npm install
RUN apt-get update && npm install

# expose  api port and debug port
EXPOSE 3001 9229

CMD [ "npm", "run", "start" ]
