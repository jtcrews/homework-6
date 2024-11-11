const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

const Category = {
    getAll: (callback) => {
        db.all(`SELECT * FROM Categories`, [], (err, rows) => {
            callback(err, rows);
        });
    },
};

module.exports = Category;
