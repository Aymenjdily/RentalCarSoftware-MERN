const mongoose = require('mongoose')
const Place = require('../models/placeModel')

// create a Place

const addPlace = async (req, res) => {
    const { image, name, description } = req.body

    let emptyFields = []

    // validations

    if(!image){
        emptyFields.push('image')
    }
    if(!name){
        emptyFields.push('name')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({
            error: 'Please fill All fields',
            emptyFields
        })
    }

    try{
        const place = await Place.create({
           image, name, description
        })
        res.status(200).json(place)
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

// get All places

const getAllPlaces = async (req, res) => {
    const places = await Place.find({}).sort({createdAt: -1})

    res.status(200).json(places)
}

// Update a Place

const updatePlace = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Client'})
    }

    const client = await Place.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!client){
        return res.status(404).json({error: "No such Client"})
    }

    res.status(200).json(client)
}

// Get single Place

const getSinglePlace = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Place'})
    }

    const place = await Place.findById(id)

    if(!place){
        return res.status(404).json({error: "No such Place"})
    }

    res.status(200).json(place)
}

module.exports = {
    addPlace,
    getAllPlaces,
    updatePlace,
    getSinglePlace
}