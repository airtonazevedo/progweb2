FROM node:16-alpine

WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install nodemon -g
RUN npm install
EXPOSE 3333

CMD ["npm", "start"]