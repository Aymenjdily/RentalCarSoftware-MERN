const Feedback = require('../models/feedbackModel')
const mongoose = require('mongoose')

// Add Feedback

const addFeedback = async (req, res) => {
    const { name, description } = req.body

    let emptyFields = []

    // validations

    if(!description){
        emptyFields.push('description')
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
        const feedback = await Feedback.create({
           name, description
        })
        res.status(200).json(feedback)
    }
    catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}

// get All places

const getAllFeedbacks = async (req, res) => {
    const feedback = await Feedback.find({}).sort({createdAt: -1})

    res.status(200).json(feedback)
}

// delete Car

const deleteFeedback = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Feedback'})
    }

    const feedback = await Feedback.findOneAndRemove({_id: id})

    if(!feedback){
        return res.status(404).json({error: "No such Feedback"})
    }

    res.status(200).json(feedback)
}

module.exports = {
    getAllFeedbacks,
    addFeedback,
    deleteFeedback
}