const Category = require('../models/category');
const Joke = require('../models/joke');

const jokeController = {
    getCategories: (req, res) => {
        Category.getAll((err, categories) => {
            if (err) return res.status(500).send("Failed to retrieve categories.");
            res.json(categories.map(c => c.name));
        });
    },

    getJokesByCategory: (req, res) => {
        const category = req.params.category;
        const limit = parseInt(req.query.limit) || -1;

        Joke.getByCategory(category, limit, (err, jokes) => {
            if (err) return res.status(500).send("Error retrieving jokes.");
            if (jokes.length === 0) return res.status(404).send("Category not found.");
            res.json(jokes);
        });
    },

    addJoke: (req, res) => {
        const { category, setup, delivery } = req.body;
        if (!category || !setup || !delivery) {
            return res.status(400).send("Missing required fields.");
        }

        Joke.addJoke(category, setup, delivery, (err, newJoke) => {
            if (err) return res.status(500).send(err);
            res.json(newJoke);
        });
    },
};

module.exports = jokeController;
