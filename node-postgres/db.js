const { Client } = require('pg');

const config = {
    user: 'postgres',
    database: 'nodeapp',
    password: 'root',
    host: 'localhost',
    port: 5432,
    max: 10,
}

// const pool = new Pool(config);

const client = new Client(config);
client.connect();

client.on('error', (err) => {
    console.log('DB connection error: ', error)
})

module.exports = client;