const Ticket = require('../models/ticketModel')
const mongoose = require('mongoose')

// GET all tickets
const getTickets = async (req, res) => {
    const tickets = await Ticket.find({}).sort({ createdAt: -1 }) // Fetching all tickets from the database and sorting them by createdAt field in descending order
    res.status(200).json(tickets)
}

// GET single ticket
const getTicket = async (req, res) => {

  // Extracting the ticket ID from the request parameters
    const { id } = req.params

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Ticket' })  // error message if the ID is invalid
    }

    const ticket = await Ticket.findById(id) // Finding the ticket with the given ID

    // Check if the ticket exists
    if (!ticket) {
        return res.status(404).json({ error: 'No such Ticket' }) // error message if the ticket is not found
    }

    res.status(200).json(ticket)
}

// CREATE new ticket
const createTicket = async (req, res) => {
  // Extracting the ticket details from the request body
    const { sname, email, contNo, module, inquiry, message } = req.body 
    let emptyFields = [] // Creating an empty array to store the names of any empty fields

  // Check if any required fields are empty
    if (!sname) {
        emptyFields.push('sname')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!contNo) {
        emptyFields.push('contNo')
    }
    if (!module) {
        emptyFields.push('module')
    }
    if (!inquiry) {
        emptyFields.push('inquiry')
    }
    if (!message) {
        emptyFields.push('message')
    }
    if (emptyFields.length > 0) {
        
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const ticket = await Ticket.create({ sname, email, contNo, module, inquiry, message }) // Creating a new ticket using the Ticket model and the extracted details
        res.status(200).json(ticket)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a ticket
const deleteTicket = async (req, res) => {
    const { id } = req.params

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        
        return res.status(404).json({ error: 'No such Ticket' })
    }

    const ticket = await Ticket.findOneAndDelete({ _id: id }) // Find and delete the ticket with the given ID
    if (!ticket) {
        // Check if the ticket exists
        return res.status(404).json({ error: 'No such Ticket' }) // error message if the ticket is not found
      
    }
    res.status(200).json(ticket)
}

// UPDATE a ticket
const updateTicket = async (req, res) => {
  const { id } = req.params

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
     
      return res.status(404).json({ error: 'No such Ticket' })
  }

  const ticket = await Ticket.findById(id) // Find the ticket with the given ID

  if (!ticket) {
      // Check if the module exists
      return res.status(400).json({ err: 'No such Ticket' })  // error message if the ticket is not found
  }

  // Update details if the fields are present in the request body, otherwise keep the existing values
  ticket.sname = req.body.sname || ticket.sname
  ticket.email = req.body.email || ticket.email
  ticket.contNo = req.body.contNo || ticket.contNo
  ticket.module = req.body.module || ticket.module
  ticket.inquiry = req.body.inquiry || ticket.inquiry
  ticket.message = req.body.message || ticket.message

  try {
      const updatedTicket = await ticket.save() // Save the updated ticket
      res.status(200).json(updatedTicket) // Return the updated ticket as a JSON response with a 200 status code
  } catch (error) {
      res.status(400).json({ error: error.message }) // error message if there was an error during the update process
    
  }
}

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
