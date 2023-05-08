import { useState } from 'react';
import { useTicketsContext } from "../hooks/useTicketsContext"

const TicketDetails = ({ticket}) => {
    // Accessing the dispatch function from the tickets context
    const {dispatch} = useTicketsContext()

    // State variables for update mode and ticket fields
    const [updateMode, setUpdateMode] = useState(false)
    const [updatedSname, setUpdatedSname] = useState(ticket.sname)
    const [updatedEmail, setUpdatedEmail] = useState(ticket.email)
    const [updatedContNo, setUpdatedContNo] = useState(ticket.contNo)
    const [updatedModule, setUpdatedModule] = useState(ticket.module)
    const [updatedInquiry, setUpdatedInquiry] = useState(ticket.inquiry)
    const [updatedMessage, setUpdatedMessage] = useState(ticket.message)
   
    // Function to handle the update of a ticket
    const handleUpdate = async () => {
        const updatedTicket = {
            sname: updatedSname,
            email: updatedEmail,
            contNo: updatedContNo,
            module: updatedModule,
            inquiry: updatedInquiry,
            message: updatedMessage
        }
      
        // Send a PATCH request to update the ticket
        const response = await fetch('/api/ticket/' + ticket._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedTicket),
            headers: {
                'Content-Type': 'application/json',
            }
        })
  
        const json = await response.json()
  
        // If the response is successful, dispatch an action to update the ticket and exit update mode
        if (response.ok) {
            dispatch({ type: 'UPDATE_TICKET', payload: json })
            setUpdateMode(false)
        }
    }

    // Function to handle the deletion of a ticket
    const handleDelete = async () =>{
        // Send a DELETE request to delete the ticket
        const response = await fetch('/api/ticket/' + ticket._id, {
            method:'DELETE'
        })
        const json = await response.json()

        // If the response is successful, dispatch an action to delete the ticket
        if(response.ok){
            dispatch({type: 'DELETE_TICKET', payload:json})
        }
    }

    return (
        <div id="ticket-details">
          <div>
            {updateMode ? (
              // Update mode: show input fields for editing and buttons to save or cancel
              <>
                <input type="text" value={updatedSname} onChange={(e) => setUpdatedSname(e.target.value)} />
                <input type="text" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
                <input type="text" value={updatedContNo} onChange={(e) => setUpdatedContNo(e.target.value)} />
                <input type="text" value={updatedModule} onChange={(e) => setUpdatedModule(e.target.value)} />
                <input type="text" value={updatedInquiry} onChange={(e) => setUpdatedInquiry(e.target.value)} />
                <input type="text" value={updatedMessage} onChange={(e) => setUpdatedMessage(e.target.value)} />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setUpdateMode(false)}>Cancel</button>
              </>
            ) : (
              // Read-only mode: display ticket details and buttons to delete or update
              <>
                <h4 id="sname">STU: {ticket.sname}</h4>
                <p><strong>Email:</strong> {ticket.email}</p>
                <p><strong>Contact number:</strong> {ticket.contNo}</p>
                <p><strong>Module:</strong> {ticket.module}</p>
                <p><strong>Request/Inquiry type:</strong> {ticket.inquiry}</p>
                <p><strong>Message:</strong> {ticket.message}</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setUpdateMode(true)}>Update</button>
              </>
            )}
          </div>
      
          <div id="ticket-r">
          <div id="message-container">
             <p>Thank you, we have received your request.</p>
             <p>Reference number: <span id="reference-number">KBVG-OROR-{ticket._id}</span></p>
             <p>Thank you for contacting us. One of our team will be in touch with you shortly.</p>
                    </div>
                </div>
            </div>
        
    );
}

export default TicketDetails;