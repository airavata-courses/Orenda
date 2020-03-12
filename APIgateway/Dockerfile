<<<<<<< HEAD
FROM node:10
=======
FROM node:carbon
>>>>>>> develop
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]

