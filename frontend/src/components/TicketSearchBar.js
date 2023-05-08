import React, { useState } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext";
import TicketDetails from "./TicketDetails";
import '../SupportServices.css'
import jsPDF from "jspdf";

// Function to handle the  searcbar
const SearchBar = () => {
  const { tickets, dispatch } = useTicketsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Function to handle generating the PDF report
  const handleGeneratePDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set initial y position
  let y = 20;

  // Increase y position
  y += 10;

  // Add content to the PDF
  tickets.forEach((ticket, index) => {
    // Set font style to bold for the ticket index
    doc.setFont(undefined, 'bold');
    doc.setFontSize(13);
    doc.text(`Ticket ${index + 1}`, 10, y);

  // Reset font style to normal for the rest of the text
    doc.setFont(undefined, 'normal');
    y += 10;

    doc.setFontSize(13);
    doc.text(`Student Name: ${ticket.sname}`, 10, y);
    y += 8;

    doc.text(`Email: ${ticket.email}`, 10, y);
    y += 8;

    doc.text(`Contact number: ${ticket.contNo}`, 10, y);
    y += 8;

    doc.text(`Module: ${ticket.module}`, 10, y);
    y += 8;

    doc.text(`Request/Inquiry type: ${ticket.inquiry}`, 10, y);
    y += 8;

    doc.text(`Message: ${ticket.message}`, 10, y);
    y += 10;

    doc.setTextColor(25,121,169); // Set text color to red
    doc.text(`Reference number: ${ticket._id}`, 20, y);
    doc.setTextColor(0, 0, 0); // Reset text color to black
    y += 10;

    // Add spacing between tickets
    y += 10;
  });
 // Add some decorations to the PDF
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 100, 20, 'F');
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(20);
  doc.text("Student Tickets List", 10, 15);

  

  // Save the PDF as a file
  doc.save('tickets.pdf');
};


  // Filter the tickets based on the search term
  const filteredTicket = tickets
    ? tickets.filter((tickets) =>
    tickets.inquiry.toLowerCase().includes(searchTerm.toLowerCase())
    
      )
    : [dispatch];

  return (
    <div id="search-section" >
      &nbsp;
      <h2>My Tickets</h2> 
      <input 
        type="text"
        placeholder="Search by Request/ Inquiry type"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button type="button"  onClick={clearSearch}>Clear</button>
      &nbsp;
      
      <button  onClick={handleGeneratePDF}>Generate Report</button>
      
      {filteredTicket.map((ticket) => (
        // Render filtered feedback details using FeedbackDetails component
        <TicketDetails key={ticket._id} ticket={ticket} />
      ))}
      {filteredTicket.length === 0 && <p>Not found.</p>}
    </div>
  );
};

export default SearchBar;