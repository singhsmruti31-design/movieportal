const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const moviesFilePath = path.join(__dirname, '../data/movies.json');

const getMovies = () => {
    try {
        const data = fs.readFileSync(moviesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveMovies = (movies) => {
    fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));
};

// Get all movies
router.get('/', (req, res) => {
    const movies = getMovies();
    res.status(200).json(movies);
});

// Add new movie (Admin)
router.post('/add-movie', (req, res) => {
    const { title, poster, rating, genre, description, showtimes } = req.body;

    if (!title || !poster || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const movies = getMovies();
    const newMovie = {
        id: uuidv4(),
        title,
        poster,
        rating: parseFloat(rating) || 0,
        genre: genre || 'Unknown',
        description,
        showtimes: showtimes || []
    };

    movies.push(newMovie);
    saveMovies(movies);

    res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
});

// Delete movie (Admin)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let movies = getMovies();

    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    movies.splice(movieIndex, 1);
    saveMovies(movies);

    res.status(200).json({ message: 'Movie deleted successfully' });
});

module.exports = router;
