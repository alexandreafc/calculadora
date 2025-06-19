import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './components/Calculator';
import './globals.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
);