import './index.css'; // Pastikan CSS utama Anda diimpor di sini
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import komponen App utama Anda

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);