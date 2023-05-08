import { useEffect } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext"
import '../SupportServices.css'

// components
import TicketFrom from "../components/TicketForm";
//import TicketDetails from "../components/TicketDetails";
import SearchBar from "../components/TicketSearchBar"


// Access the dispatch function from the tickets context
const TicketShow = () => {
  const { dispatch } = useTicketsContext()

    // Fetch tickets data from the server
    useEffect(()=>{
      
        const fetchTickets = async() => {
            const response = await fetch('/api/ticket') // Send a GET request to fetch tickets
            const json = await response.json()

            // If the response is successful, update the tickets in the context
            if(response.ok){
              dispatch({type: 'SET_TICKETS', payload: json})
            }
        }
        fetchTickets() // Call the fetchTickets function when the effect runs
    }, )

  return (
    <div className="ticket">
      <TicketFrom/>
      
      <div className="tickets">

      <SearchBar/>
        
      </div>
      
    </div>
  );
};

export default TicketShow