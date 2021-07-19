const { Pool } = require('pg')

const config = {
    connectionString: process.env.DATABASE_URL,
    user: 'bhtghgpppmqyod',
    host: 'ec2-23-21-4-7.compute-1.amazonaws.com',
    password: '45c31e0e878c1906e76b0f1b4e156b28096feff184b9d882f4c01acff4d629f3',
    database: 'd76sjvbr38fa7b',
    port: 5432,
    ssl: { rejectUnauthorized: false }
}



const pool = new Pool(config)

module.exports = pool
