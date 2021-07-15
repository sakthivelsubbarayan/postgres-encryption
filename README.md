# postgres-encryption
Example for postgres field level encryption with sequalize and node js

## DB migrations
Need **sequelize-cli**
- To generate the new migration file

  `node_modules/.bin/sequelize migration:generate --name <module_name>`
- To upgrade the db

  `node_modules/.bin/sequelize db:migrate`
- To downgrade the db

  `node_modules/.bin/sequelize db:migrate:undo`

for more info visit [Documentation](http://docs.sequelizejs.com/manual/tutorial/migrations.html)



## Installation

`npm install`

## Create tables 
- To update the database schema 

  `sh migrate.sh`

## Start

  `npm start`
