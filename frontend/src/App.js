
import {BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components

import Ticket from './pages/TicketShow';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
     
      <div className='pages'>
        <Routes>
          <Route
            path="/"
            element={ <Ticket/>}

          />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
