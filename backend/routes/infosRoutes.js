const express = require('express')

const router = express.Router()

const { getAllInformations, addInfos, updateAllInfos, getSingleInformations } = require('../controllers/infosController')

/// middleware

/// Routes

// get all manga
router.get('/', getAllInformations)

// get Informations Details
router.get('/:id', getSingleInformations)

// create manga
router.post('/', addInfos)

// update All Car Details
router.put('/:id', updateAllInfos)

module.exports = router