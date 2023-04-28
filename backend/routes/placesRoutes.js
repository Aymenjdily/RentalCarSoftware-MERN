const express = require('express')

const router = express.Router()

const { getAllPlaces, addPlace, updatePlace, getSinglePlace } = require('../controllers/placeController')

/// midlleware

/// Routes

// add a Place
router.post('/', addPlace)

// get All Places
router.get('/', getAllPlaces)

// get Single Place
router.get('/:id', getSinglePlace)

// Update a Place
router.put('/:id', updatePlace)

// Delete a Place
router.delete('/:id', )

module.exports = router