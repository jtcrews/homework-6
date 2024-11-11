const express = require('express');
const app = express();
const jokebookRoutes = require('./routes/jokebook');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    db.get(`SELECT setup, delivery FROM Jokes ORDER BY RANDOM() LIMIT 1`, [], (err, randomJoke) => {
        db.all(`SELECT name FROM Categories`, [], (err, categories) => {
            res.render('index', { randomJoke, categories });
        });
    });
});

app.use('/jokebook', jokebookRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:3000`);
});
