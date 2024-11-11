const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

const Joke = {
    getByCategory: (category, limit, callback) => {
        const query = `
            SELECT Jokes.setup, Jokes.delivery
            FROM Jokes
            JOIN Categories ON Jokes.category_id = Categories.id
            WHERE Categories.name = ?
            LIMIT ?
        `;
        db.all(query, [category, limit || -1], (err, rows) => {
            callback(err, rows);
        });
    },

    addJoke: (category, setup, delivery, callback) => {
        const findCategoryId = `SELECT id FROM Categories WHERE name = ?`;
        db.get(findCategoryId, [category], (err, row) => {
            if (err || !row) return callback("Invalid category");
            
            const insertJoke = `INSERT INTO Jokes (category_id, setup, delivery) VALUES (?, ?, ?)`;
            db.run(insertJoke, [row.id, setup, delivery], function(err) {
                callback(err, { id: this.lastID, setup, delivery });
            });
        });
    },
};

module.exports = Joke;
