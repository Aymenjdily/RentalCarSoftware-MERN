const Infos = require('../models/infosModel')
const mongoose = require('mongoose')

// Add Feedback

const addInfos = async (req, res) => {
    const { banner, whatssap, phone, email, facebook, instagram, youtube } = req.body


    try{
        const informations = await Infos.create({
            banner, whatssap, phone, email, facebook, instagram, youtube
        })
        res.status(200).json(informations)
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

// get All Informations

const getAllInformations = async (req, res) => {
    const informations = await Infos.find({}).sort({createdAt: -1})

    res.status(200).json(informations)
}

// get Informations Details

const getSingleInformations = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Informations'})
    }

    const informations = await Infos.findById(id)

    if(!informations){
        return res.status(404).json({error: "No such Informations"})
    }

    res.status(200).json(informations)
}

// update Informations

const updateAllInfos = async (req, res) => {
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

module.exports = {
    getAllInformations,
    addInfos,
    updateAllInfos,
    getSingleInformations
}