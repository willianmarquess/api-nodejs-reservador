const { Pool } = require('pg');

module.exports = class Connection {
    static getConnection() {
        return new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'reservador',
            password: 'willian',
            port: 5432
        });
    }
}