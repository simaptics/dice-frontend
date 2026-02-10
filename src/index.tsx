import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for React 18
import AppWithRouter from './App'; 
import "./index.css";

//import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>
);