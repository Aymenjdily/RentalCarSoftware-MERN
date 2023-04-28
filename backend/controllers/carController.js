const Car = require('../models/carModel')
const mongoose = require('mongoose')

// create a Car

const createCar = async (req, res) => {
    const { name, category, type, places, price, image, state } = req.body

    let emptyFields = []

    // validation

    if(!name){
        emptyFields.push('name')
    }
    if(!category){
        emptyFields.push('category')
    }
    if(!type){
        emptyFields.push('type')
    }
    if(!places){
        emptyFields.push('places')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(!image){
        emptyFields.push('image url')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({
            error: 'Please fill All fields',
            emptyFields
        })
    }
    
    // create the manga

    try{
        const car = await Car.create({
            name, category, type, places, price, image, state
        })
        res.status(200).json(car)
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

// get all Cars

const getAllCars = async (req, res) => {
    const cars = await Car.find({}).sort({createdAt: -1})

    res.status(200).json(cars)
}

// get single Car

const getSingleCar = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Car'})
    }

    const car = await Car.findById(id)

    if(!car){
        return res.status(404).json({error: "No such Car"})
    }

    res.status(200).json(car)
}

// update All Car Details

const updateAllCar = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Car'})
    }

    const car = await Car.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!car){
        return res.status(404).json({error: "No such Car"})
    }

    res.status(200).json(car)
}

// delete Car

const deleteCar = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Car'})
    }

    const car = await Car.findOneAndRemove({_id: id})

    if(!car){
        return res.status(404).json({error: "No such Car"})
    }

    res.status(200).json(car)
}

module.exports = {
    createCar,
    getAllCars,
    getSingleCar,
    updateAllCar,
    deleteCar
}