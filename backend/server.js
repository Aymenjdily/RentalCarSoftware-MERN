require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const CarRouter = require('./routes/carRoutes')
const ClientsRouter = require('./routes/bookRoutes')
const PlaceRouter = require('./routes/placesRoutes')
const FeedbackRouter = require('./routes/feedbackRoutes')
const InfosRouter = require('./routes/infosRoutes')

// middleware

app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes

app.use('/api/cars', CarRouter)
app.use('/api/clients', ClientsRouter)
app.use('/api/places', PlaceRouter)
app.use('/api/feedbacks', FeedbackRouter)
app.use('/api/infos', InfosRouter)

// Conntect to DB and Listening to PORT

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
       console.log(`Connected to DB & Listening on Port : ${process.env.PORT}`)
    })
}).catch((error) => {console.log(error)})