const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.get('/categories', jokeController.getCategories);

router.get('/joke/:category', jokeController.getJokesByCategory);

router.post('/joke/new', jokeController.addJoke);

module.exports = router;
