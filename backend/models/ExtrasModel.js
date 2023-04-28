const mongoose = require('mongoose')

const Schema = mongoose.Schema

const extrasModel = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: false
    },
    type:{
        type: String,
        required: false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Extras', extrasModel)