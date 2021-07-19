const { Pool } = require('pg')
require('dotenv').config()

// const config = {
//     user: 'postgres',
//     host: 'postgres://bhtghgpppmqyod:45c31e0e878c1906e76b0f1b4e156b28096feff184b9d882f4c01acff4d629f3@ec2-23-21-4-7.compute-1.amazonaws.com:5432/d76sjvbr38fa7b',
//     password: '123123',
//     database: 'my_first_DB'
// }
// const devConfig = {
//     user:  process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE,
// }
const proConfig = {
    connectionString: process.env.DATABASE_URL
}
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

// const pool = new Pool(devConfig)
const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig
})

module.exports = pool