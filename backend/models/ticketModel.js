const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Define the ticket schema
const ticketSchema = new Schema({
    sname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contNo: {
        type: Number,
        required: true
    },
    module: {
        type: String,
        required: true
    },
    inquiry: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Export the Ticket model
module.exports = mongoose.model('Ticket', ticketSchema)
