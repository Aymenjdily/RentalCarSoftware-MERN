const Extra = require('../models/ExtrasModel')
const mongoose = require('mongoose')

// add Extra

const addExtra = async (req, res) => {
    const { title, description, price, type } = req.body

    let emptyFields = []

    // validations

    if(!description){
        emptyFields.push('description')
    }
    if(!title){
        emptyFields.push('title')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({
            error: 'Please fill All fields',
            emptyFields
        })
    }

    try{
        const extras = await Extra.create({
           title, description, price, type
        })
        res.status(200).json(extras)
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

// get all Extras

const getAllExtras = async (req, res) => {
    const extras = await Extra.find({}).sort({createdAt: -1})

    res.status(200).json(extras)
}

// update Extras

const updateExtra = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Informations'})
    }

    const infomrations = await Infos.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!infomrations){
        return res.status(404).json({error: "No such Informations"})
    }

    res.status(200).json(infomrations)
}