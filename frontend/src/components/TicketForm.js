import { useState } from "react";
import bgImg from '../assets/img1.png';
import '../SupportServices.css'

const TicketFrom = () => {

    const[sname, setName] = useState('')
    const[email, setEmail] = useState('')
    const[contNo, setContNo] = useState('')
    const[module, setModule] = useState('')
    const[inquiry, setInquiry] = useState('')
    const[message, setMessage] = useState('')
    const[error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ticket = {sname, email, contNo, module, inquiry, message}

        const response = await fetch('/api/ticket', {
            method: 'POST',
            body: JSON.stringify(ticket),
            headers:{'Content-Type': 'application/json'}
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setName('')
            setEmail('')
            setContNo('')
            setModule('')
            setInquiry('')
            setMessage('')
            setError(null)
            setEmptyFields([])
            console.log('New Ticket Added',json)
        }
    }

    return(
        
        <section> 
            <div className="ticket-from">
                
                <div className="col-1">
                <h3> Welcome to Support Services</h3>
                    <span>Please complete this form and one of our agents will reply to you as soon as possible.</span>
            
                    <form className='create' onSubmit={handleSubmit}>
                    <label>SDT:Name</label>
                        <input type='text' className={emptyFields.includes('Title') ? 'error' : ''} value={sname} onChange={(e)=>setName(e.target.value)} />
                    <label>Email</label>
                        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <label>Contact Number</label>
                        <input type='tel'  value={contNo} onChange={(e)=>setContNo(e.target.value)} />
                    <label>Module</label>
                        <input type='text' value={module} onChange={(e)=>setModule(e.target.value)} />
                    <label>Request/Inquiry type</label>
                        <select value={inquiry}  onChange={(e) => setInquiry(e.target.value)}>
                            <option value="" selected disabled> <span>Please select the most suitable option </span></option>
                            <option value="I have a question about Registration">I have a question about Registration</option>
                            <option value="I have a question about Examinations">I have a question about Examinations</option>
                            <option value="I want to">I want to</option> 
                            <option value="Other">Other</option>       
                        </select>
                    <label>Message</label>
                        <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} />
                    
                    
                        <button type='submit' className='btn'>Submit Ticket</button>
                        {error && <div className="error">{error}</div>} 
                    </form>

                </div>
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
            </div>
        </section>
        
    )
}

export default TicketFrom;
