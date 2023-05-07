import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { TicketsContextProvider } from './context/TicketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TicketsContextProvider>
    <App />
    </TicketsContextProvider>
  </React.StrictMode>
);


