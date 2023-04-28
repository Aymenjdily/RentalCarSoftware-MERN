const express = require('express')

const router = express.Router()

const { createCar, getAllCars, getSingleCar, updateAllCar, deleteCar } = require('../controllers/carController')

/// middleware

/// Routes

// get all manga
router.get('/', getAllCars)

// create manga
router.post('/', createCar)

// delete manga
router.delete('/:id', deleteCar)

// get Signle Car
router.get('/:id', getSingleCar)

// update All Car Details
router.put('/:id', updateAllCar)

module.exports = router