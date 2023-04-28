const Client = require('../models/bookModel')
const mongoose = require('mongoose')

// Create a Client

const addClient = async (req, res) => {
    const {
        firstName, secondName, email, phone, cin, city, address, firstDate, secondDate, car, total, booked
    } = req.body

    let emptyFields = []

    // validation

    if(!firstName){
        emptyFields.push('firstName')
    }
    if(!secondName){
        emptyFields.push('secondName')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!cin){
        emptyFields.push('cin')
    }
    if(!city){
        emptyFields.push('address')
    }
    if(!firstDate){
        emptyFields.push('first Date')
    }
    if(!secondDate){
        emptyFields.push('second Date')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({
            error: 'Please fill All fields',
            emptyFields
        })
    }

    try{
        const client = await Client.create({
           firstName, secondName, email, phone, cin, city, address, firstDate, secondDate, car, total, booked
        })
        res.status(200).json(client)
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

// Get All Clients

const getAllClients = async (req, res) => {
    const clients = await Client.find({}).sort({createdAt: -1})

    res.status(200).json(clients)
}

// Get Single Client

const getSingleClient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Client'})
    }

    const client = await Client.findById(id)

    if(!client){
        return res.status(404).json({error: "No such Client"})
    }

    res.status(200).json(client)
}

// Update a Client

// Delete a Client
const deleteClient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Client'})
    }

    const client = await Client.findOneAndRemove({_id: id})

    if(!client){
        return res.status(404).json({error: "No such Client"})
    }

    res.status(200).json(client)
}

module.exports = {
    addClient,
    getAllClients,
    getSingleClient,
    deleteClient
}