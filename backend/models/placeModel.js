const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeModel = new Schema({
    image:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: false
    },
    state:{
        type: Boolean,
        required: false,
        default: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Places', placeModel)