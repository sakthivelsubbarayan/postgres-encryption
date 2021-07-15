
const dotenv = require('dotenv');
const { join } = require('path');

// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV;

const configs = {
    base: {
        env,
        name: 'database',
        host: 'localhost',
        port: process.env.PORT,
        orm: {
            name: 'orm',
            modelPath: join(__dirname, '../models'),
            db: process.env.POSTGRES_DB,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            ssl: Boolean(process.env.SSL),
            dialectOptions: {
                ssl: Boolean(process.env.SSL),
            },
            pool: {
                maxConnections: 10,
                minConnections: 0,
                maxIdleTime: 30000,
            },
        },
        ssl: Boolean(process.env.SSL),
        port: process.env.PORT,
        postgresDb: process.env.POSTGRES_DB,
        postgresUser: process.env.POSTGRES_USER,
        postgresPassword: process.env.POSTGRES_PASSWORD,
        postgresHost: process.env.POSTGRES_HOST,
        postgresPort: process.env.POSTGRES_PORT,
    },
    // Sequelizer pick the NODE_ENV variables as environmental object
    development: {
        development: {
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            host: process.env.POSTGRES_HOST,
            dialect: 'postgres',
        },
    },
    production: {
        production: {
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            host: process.env.POSTGRES_HOST,
            dialect: 'postgres',
            ssl: Boolean(process.env.SSL),
            dialectOptions: {
                ssl: Boolean(process.env.SSL),
            },
        },
    }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;

