const mongoose = require('mongoose')

const Schema = mongoose.Schema

const infosModel = new Schema({
    banner:{
        type: String,
        required: true
    },
    whatssap:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    },
    instagram:{
        type: String,
        required: true
    },
    youtube:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Informations', infosModel)