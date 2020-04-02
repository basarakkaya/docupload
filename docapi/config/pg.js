const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    pg_config: {
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB_NAME,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT
    }
}