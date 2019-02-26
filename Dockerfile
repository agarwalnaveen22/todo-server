FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

EXPOSE 3600
CMD [ "npm", "run", "start"]