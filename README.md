# Welcome to RePay!

Simple template to get started with [Remix](https://remix.run) and [PayloadCMS](https://payloadcms.com).

## Development

```sh
yarn dev
```

OR:

```sh
docker compose up -d
```

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

## Migration
### Database Export

On the machine where docker is running, run the following command to export the database to the `dump` folder.
The database connection string can be found in the docker compose file that is in use (maybe you are trying to migrate
from local dev to production, then see `docker-compose.dev.yaml`)

```sh
# get the container id of the db service with docker ps
docker exec -i <container> /usr/bin/mongodump --uri mongodb://db:27017/app --out /dump

# navigate to the dump folder, it should be a docker volume defined in the docker-compose file you are using
cd path/to/dump

# zip the dump folder (it will be named like the database you are using)
zip -r dump.zip app

# dump.zip is your export
```

### Database Import

Copy the `dump.zip` file to the `dump` folder of the target machine where docker is running.
This could be done with iTerm or scp.

#### Example

If you want to migrate a local dev database to production, copy the `dump.zip` file to the production machine.
The location of the `dump` folder is defined in the docker-compose file you are using. If the volume is defined with a
relative path, it will be relative to the jenkins workspace.

```
# docker-compose.prod.yaml
services:
    db:
        volumes:
            - ./dump:/dump
            
# deploy/docker-compose.yaml
services:
    jenkins:
        volumes:
            - /var/jenkins_home:/var/jenkins_home

# resulting path on the production machine:
/var/jenkins_home/workspace/<project_name>/dump
```

Upload the `dump.zip` file via scp to the production machine and unzip it into the `dump` folder:
```sh
# scp dump.zip to the production machine
# we could try to scp it to the jenkins workspace, but that would probably fail because of permissions
scp dump.zip myserver:dump.zip

# ssh into the production machine
ssh myserver

# unzip the dump.zip file
# you might need to install unzip first with sudo apt-get install unzip
unzip dump.zip

# move the dump folder to the dump folder of the docker volume
sudo mv app /var/jenkins_home/workspace/<project-name>/dump/

```

Import the dump:
```sh
# get the container id of the db service with docker ps
docker exec -i <container> /usr/bin/mongorestore -d app /dump/app

# `/dump/app` is the path to the exported database (the path should work inside the docker container)
# `-d app` is the database where the dump should be imported to
```

### Media Import / Export

Zip the `media` folder and copy it to the target machine.

```sh
# navigate to the media folder
zip -r media.zip media

# copy the zip file to the target machine with scp / iTerm / ...
scp media.zip myserver:media.zip

# ssh into the target machine
ssh myserver

# unzip the media.zip file
unzip media.zip

# move all files from the media folder to the media folder of the docker volume
# check above example to see how the path to the media folder is defined
sudo mv media/* /var/jenkins_home/workspace/<project-name>/media/
```
