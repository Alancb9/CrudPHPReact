import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContext from './context/AppContext';
import App from './App';

//Uso del app context
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
    <AppContext>
        <App />
    </AppContext>    
);
