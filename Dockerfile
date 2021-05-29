FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]
