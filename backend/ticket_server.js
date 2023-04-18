require('dotenv').config()

const express = require ('express')
const mongoose = require ('mongoose')
const ticketRoutes = require('./routes/tickets')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/ticket', ticketRoutes)

// connct to database
mongoose.connect(process.env.MONG_URI)
    .then(() => {
    // listen for requests
    app.listen(process.env.PORT,() =>{
    console.log('gg on port',process.env.PORT)
})
    })
    .catch((error) =>{
        console.log(error)
    })

process.env