const Pool = require('pg').Pool;

let conn;

if(!conn){
    conn = new Pool({
        user: 'postgres',
        password: 'molkipg',
        host: 'localhost',
        port: 5432,
        database: 'cc-prueba1'
    });
}

export {conn}