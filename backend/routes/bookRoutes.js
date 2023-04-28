const express = require('express')

const router = express.Router()

const { addClient, getAllClients, deleteClient, getSingleClient } = require('../controllers/clientController')

/// middleware

/// Routes

// Create new Client
router.post('/', addClient)

// Update a Client
router.put('/:id', )

// Get all Clients
router.get('/', getAllClients)

// Get Single Client
router.get('/:id', getSingleClient)

// Delete a Client
router.delete('/:id', deleteClient)


module.exports = router