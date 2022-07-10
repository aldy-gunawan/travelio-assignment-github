const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');

// Get All Favorite books
router.get('/', async(req, res) => {
    try {
        const favorite = await Favorite.find();
        res.status(200).json(favorite);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Add One to Favorite
router.post('/', async(req, res) => {
    checkFavorite = await Favorite.find({id: req.body.id});
    if (checkFavorite.length > 0) {
        return res.status(200).json({ message: "It is already in favorite list", error: "nil"});
    }
    const favorite = new Favorite ({
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        thumbnail: req.body.thumbnail

    });
    try {
        const newFavorite = await favorite.save()
        res.status(201).json(newFavorite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete One from Favorite
router.delete('/:id', async(req, res) => {
    try {
        const checkFavorite = await Favorite.findById(req.params.id);
        await checkFavorite.remove();
        res.status(200).json({ message: "Book removed from favorite list", error: "nil"});
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

module.exports = router;