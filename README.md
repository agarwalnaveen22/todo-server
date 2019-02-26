# Todo Server Rest APIs

This app will be run in docker container, hence it is mandatory to install docker in the system:-

https://docs.docker.com/install/

# verify docker is running

docker -v

# install mongodb via docker

run following in terminal:-

docker pull mongo
docker run -d -p 27017:27017 mongo

# download git repository

git clone https://github.com/agarwalnaveen22/todo-server.git

# change mongodb host ip

go to project root folder -> common -> config -> connect.config.js

and change localhost to ip address in which mongodb is running

# create docker image from dockerfile

go to project root folder and run following command:-

docker build -t todo:latest .

# create docker container

docker run -d -p 3600:3600 todo

# check docker container is running

docker ps

# start swagger api document

go to any browser and enter following url:-

http://localhost:3600/api-docs