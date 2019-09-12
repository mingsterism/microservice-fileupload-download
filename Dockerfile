FROM node:lts-slim

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

CMD ["npm","test"] 
CMD [ "npm", "run", "start" ]
