
const { Client } = require('pg')

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "agenda-petshop",
    password: "mosaico18",
    port: 5432
})

module.exports = client

