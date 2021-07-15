
const config = require('../config');
const Sequelize = require('sequelize');

const returnObj = {
    setup,
};
//Initialize the Database

function setup() {
    if (config.env === 'development') {
        new Sequelize(config.postgresDb, config.postgresUser, config.postgresPassword, {
            host: config.postgresHost,
            port: config.postgresPort,
            dialect: 'postgres',
        })
            .authenticate()
            .then(() => {
                console.log('Database Connection has been established successfully');
            })
            .catch((err) => {
                console.log('Database Connection Error', err);
            });
    } else {
        new Sequelize(config.postgresDb, config.postgresUser, config.postgresPassword, {
            host: config.postgresHost,
            port: config.postgresPort,
            dialect: 'postgres',
            ssl: config.ssl,
            dialectOptions: {
                ssl: config.ssl,
            },
        })
            .authenticate()
            .then(() => {
                console.log('Database Connection has been established successfully');
            })
            .catch((err) => {
                console.log('Database Connection Error', err);
            });
    }
}

module.exports = returnObj;
