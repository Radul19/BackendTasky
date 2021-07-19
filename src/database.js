const { Pool } = require('pg')
require('dotenv').config()

const config = {
    user: 'postgres',
    host: 'localhost',
    password: '123123',
    database: 'my_first_DB'
}
const config2 = {
    user: 'yibanthznkhlhj',
    host: 'ec2-52-6-77-239.compute-1.amazonaws.com',
    password: "29a74f842838dfb4d555654ce4549e2b80374830837d664c6719d8d5862acae5",
    database: 'dd9o2bt2jre6rm',
    port:'5432',
    ssl: {
        rejectUnauthorized: false,
      },
}
// const devConfig = {
//     user:  process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE,
// // }
const proConfig = {
    connectionString: process.env.DATABASE_URL
}
const proConfig2 = {
    connectionString: "postgres://yibanthznkhlhj:29a74f842838dfb4d555654ce4549e2b80374830837d664c6719d8d5862acae5@ec2-52-6-77-239.compute-1.amazonaws.com:5432/dd9o2bt2jre6rm"
}
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

// const pool = new Pool(devConfig)
const pool = new Pool(config2)
// proConfig
// connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig
// connectionString : `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

module.exports = pool
