const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    places: {
        type: Number,
        require: true
    },
    price:{
        type:Number,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: false,
        default:"active"
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Cars', carSchema)