const { Pool } = require('pg')

const config = {
    user: 'postgres',
    host: 'localhost',
    password: '123123',
    database: 'my_first_DB'
}


const pool = new Pool(config)

module.exports = pool