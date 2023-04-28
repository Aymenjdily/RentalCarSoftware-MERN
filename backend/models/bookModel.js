const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    firstDate: {
        type: String,
        required: true
    },
    secondDate: {
        type: String,
        required: true
    },
    car:{
        type: Object,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    booked: {
        type: Boolean,
        required: false,
        default: false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Clients', bookSchema)